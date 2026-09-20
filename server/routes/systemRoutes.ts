import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const systemRouter = Router();

const uploadsDir = path.resolve(process.cwd(), 'uploads');

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `Victor_Chukwuemeka_Resume_${Date.now()}.pdf`);
  }
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 15 * 1024 * 1024 }
});

// GET /api/stats (Admin - Lab Control Room)
systemRouter.get('/stats', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const projectsCount = await queryOne(`SELECT COUNT(*) as c FROM projects`);
    const publishedProjects = await queryOne(`SELECT COUNT(*) as c FROM projects WHERE published = 1`);
    const experimentsCount = await queryOne(`SELECT COUNT(*) as c FROM experiments`);
    const completedExp = await queryOne(`SELECT COUNT(*) as c FROM experiments WHERE status = 'Completed'`);
    const learningCount = await queryOne(`SELECT COUNT(*) as c FROM learning_log`);
    const unreadMessages = await queryOne(`SELECT COUNT(*) as c FROM contact_messages WHERE is_read = 0`);
    const totalMessages = await queryOne(`SELECT COUNT(*) as c FROM contact_messages`);
    const skillsCount = await queryOne(`SELECT COUNT(*) as c FROM skills`);

    res.json({
      success: true,
      data: {
        projects: projectsCount?.c || 0,
        publishedProjects: publishedProjects?.c || 0,
        experiments: experimentsCount?.c || 0,
        completedExperiments: completedExp?.c || 0,
        learningEntries: learningCount?.c || 0,
        unreadMessages: unreadMessages?.c || 0,
        totalMessages: totalMessages?.c || 0,
        skillsCount: skillsCount?.c || 0,
        engine: 'SQLite 3 (WASM Embedded)',
        status: 'OPERATIONAL'
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to aggregate system telemetry' });
  }
});

// EDUCATION
systemRouter.get('/education', async (req: Request, res: Response): Promise<void> => {
  try {
    const education = await queryAll(`SELECT * FROM education ORDER BY created_at DESC`);
    res.json({ success: true, data: education });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// CERTIFICATIONS
systemRouter.get('/certifications', async (req: Request, res: Response): Promise<void> => {
  try {
    const certs = await queryAll(`SELECT * FROM certifications ORDER BY date DESC`);
    res.json({ success: true, count: certs.length, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

systemRouter.post('/certifications', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, issuer, date, credential, certificate_url, description } = req.body;
    if (!title || !issuer) {
      res.status(400).json({ success: false, message: 'Title and issuer are required' });
      return;
    }

    const id = `crt_${Date.now()}`;
    const now = new Date().toISOString();

    await runQuery(
      `INSERT INTO certifications (id, title, issuer, date, credential, certificate_url, description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, issuer, date || '', credential || '', certificate_url || '', description || '', now, now]
    );

    const created = await queryOne(`SELECT * FROM certifications WHERE id = ?`, [id]);
    res.status(201).json({ success: true, message: 'Certification logged', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to record certification' });
  }
});

systemRouter.delete('/certifications/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await runQuery(`DELETE FROM certifications WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Certification removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete certification' });
  }
});

// RESUME
systemRouter.get('/resume', async (req: Request, res: Response): Promise<void> => {
  try {
    const resume = await queryOne(`SELECT * FROM resume WHERE is_active = 1 LIMIT 1`);
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

systemRouter.get('/resume/download', async (req: Request, res: Response): Promise<void> => {
  try {
    const resume = await queryOne(`SELECT * FROM resume WHERE is_active = 1 LIMIT 1`);
    if (resume && resume.file_url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), resume.file_url);
      if (fs.existsSync(filePath)) {
        res.download(filePath, 'Chukwuemeka_Victor_Resume.pdf');
        return;
      }
    }

    // Default response if no file uploaded yet
    res.setHeader('Content-Type', 'text/plain');
    res.send('Chukwuemeka Victor Chukwuemeka - Engineering Profile & Medical Laboratory Science.');
  } catch (err) {
    res.status(500).send('Error retrieving resume document');
  }
});

systemRouter.post('/resume/upload', requireAuth, uploadResume.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No resume PDF provided' });
      return;
    }

    const id = `res_${Date.now()}`;
    const now = new Date().toISOString();
    const publicUrl = `/uploads/${req.file.filename}`;

    // Deactivate previous
    await runQuery(`UPDATE resume SET is_active = 0`);
    await runQuery(
      `INSERT INTO resume (id, title, file_url, is_active, uploaded_at)
       VALUES (?, ?, ?, 1, ?)`,
      [id, req.file.originalname, publicUrl, now]
    );

    const active = await queryOne(`SELECT * FROM resume WHERE id = ?`, [id]);
    res.status(201).json({ success: true, message: 'Active resume updated', data: active });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to update resume' });
  }
});

// SITE SETTINGS
systemRouter.get('/site-settings', async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await queryAll(`SELECT key, value FROM site_settings`);
    const settingsObj = settings.reduce((acc: any, cur: any) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {});
    res.json({ success: true, data: settingsObj });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

systemRouter.put('/site-settings', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    const now = new Date().toISOString();

    for (const [key, val] of Object.entries(updates)) {
      await runQuery(
        `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
        [key, String(val), now]
      );
    }

    const settings = await queryAll(`SELECT key, value FROM site_settings`);
    const settingsObj = settings.reduce((acc: any, cur: any) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {});

    res.json({ success: true, message: 'Site configuration updated', data: settingsObj });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update site settings' });
  }
});
