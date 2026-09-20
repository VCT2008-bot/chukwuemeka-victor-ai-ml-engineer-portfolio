import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const mediaRouter = Router();

const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .slice(0, 50);
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e4)}`;
    cb(null, `${sanitizedBase}_${uniqueSuffix}${ext}`);
  }
});

// Allowed mimetypes: images & PDF
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'application/pdf'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only JPG, PNG, WEBP, and PDF files are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// GET /api/media (Admin)
mediaRouter.get('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const media = await queryAll(`SELECT * FROM media ORDER BY created_at DESC`);
    res.json({ success: true, count: media.length, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// POST /api/media/upload (Admin)
mediaRouter.post('/upload', requireAuth, upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const id = `med_${Date.now()}`;
    const now = new Date().toISOString();
    const publicUrl = `/uploads/${req.file.filename}`;

    await runQuery(
      `INSERT INTO media (id, filename, original_name, mime_type, size, url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, publicUrl, now]
    );

    const created = await queryOne(`SELECT * FROM media WHERE id = ?`, [id]);
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: created
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: err.message || 'File upload failed' });
  }
});

// DELETE /api/media/:id (Admin)
mediaRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const mediaItem = await queryOne(`SELECT * FROM media WHERE id = ?`, [id]);
    if (!mediaItem) {
      res.status(404).json({ success: false, message: 'Media record not found' });
      return;
    }

    // Try deleting file from disk
    const filePath = path.join(uploadsDir, mediaItem.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn('Could not remove file from disk:', e);
      }
    }

    await runQuery(`DELETE FROM media WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Media asset deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete media asset' });
  }
});
