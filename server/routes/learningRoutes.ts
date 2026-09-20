import { Router, Request, Response } from 'express';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const learningRouter = Router();

// GET /api/learning-log
learningRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeUnpublished } = req.query;
    let sql = `SELECT * FROM learning_log WHERE 1=1`;
    if (!includeUnpublished) {
      sql += ` AND published = 1`;
    }
    sql += ` ORDER BY created_at DESC`;

    const logs = await queryAll(sql);
    res.json({ success: true, count: logs.length, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Database error fetching learning log' });
  }
});

// POST /api/learning-log (Admin)
learningRouter.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, domain, status, focus_area, notes, date, published } = req.body;
    if (!topic || !domain || !status) {
      res.status(400).json({ success: false, message: 'Topic, domain, and status are required' });
      return;
    }

    const id = `lrn_${Date.now()}`;
    const now = new Date().toISOString();

    await runQuery(
      `INSERT INTO learning_log (id, topic, domain, status, focus_area, notes, date, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        topic,
        domain,
        status,
        focus_area || '',
        notes || '',
        date || 'SEPTEMBER 2026',
        published !== undefined ? (published ? 1 : 0) : 1,
        now,
        now
      ]
    );

    const created = await queryOne(`SELECT * FROM learning_log WHERE id = ?`, [id]);
    res.status(201).json({ success: true, message: 'Learning entry created', data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to create learning entry' });
  }
});

// PUT /api/learning-log/:id (Admin)
learningRouter.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await queryOne(`SELECT * FROM learning_log WHERE id = ?`, [id]);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Learning log entry not found' });
      return;
    }

    const { topic, domain, status, focus_area, notes, date, published } = req.body;
    const now = new Date().toISOString();

    await runQuery(
      `UPDATE learning_log SET
        topic = ?,
        domain = ?,
        status = ?,
        focus_area = ?,
        notes = ?,
        date = ?,
        published = ?,
        updated_at = ?
       WHERE id = ?`,
      [
        topic ?? existing.topic,
        domain ?? existing.domain,
        status ?? existing.status,
        focus_area ?? existing.focus_area,
        notes ?? existing.notes,
        date ?? existing.date,
        published !== undefined ? (published ? 1 : 0) : existing.published,
        now,
        id
      ]
    );

    const updated = await queryOne(`SELECT * FROM learning_log WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Learning log entry updated', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to update learning entry' });
  }
});

// DELETE /api/learning-log/:id (Admin)
learningRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await runQuery(`DELETE FROM learning_log WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Learning entry deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to delete learning entry' });
  }
});
