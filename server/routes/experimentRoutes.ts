import { Router, Request, Response } from 'express';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const experimentRouter = Router();

// GET /api/experiments
experimentRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, project_id } = req.query;
    let sql = `SELECT e.*, p.title as project_title, p.slug as project_slug
               FROM experiments e
               LEFT JOIN projects p ON e.project_id = p.id
               WHERE 1=1`;
    const params: any[] = [];

    if (status && status !== 'All') {
      sql += ` AND e.status = ?`;
      params.push(status);
    }

    if (project_id) {
      sql += ` AND e.project_id = ?`;
      params.push(project_id);
    }

    if (search) {
      sql += ` AND (e.title LIKE ? OR e.question LIKE ? OR e.model LIKE ? OR e.dataset LIKE ? OR e.result LIKE ?)`;
      const wildcard = `%${search}%`;
      params.push(wildcard, wildcard, wildcard, wildcard, wildcard);
    }

    sql += ` ORDER BY e.created_at DESC`;

    const experiments = await queryAll(sql, params);
    res.json({ success: true, count: experiments.length, data: experiments });
  } catch (err: any) {
    console.error('Error fetching experiments:', err);
    res.status(500).json({ success: false, message: 'Database error fetching experiment records' });
  }
});

// GET /api/experiments/:id
experimentRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const experiment = await queryOne(
      `SELECT e.*, p.title as project_title, p.slug as project_slug
       FROM experiments e
       LEFT JOIN projects p ON e.project_id = p.id
       WHERE e.id = ? LIMIT 1`,
      [id]
    );

    if (!experiment) {
      res.status(404).json({ success: false, message: 'Experiment not found' });
      return;
    }

    res.json({ success: true, data: experiment });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// POST /api/experiments (Admin)
experimentRouter.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      project_id,
      experiment_number,
      title,
      question,
      hypothesis,
      method,
      model,
      dataset,
      metric,
      result,
      status,
      notes
    } = req.body;

    if (!title || !status) {
      res.status(400).json({ success: false, message: 'Title and status are required' });
      return;
    }

    const id = `exp_${Date.now()}`;
    const now = new Date().toISOString();

    await runQuery(
      `INSERT INTO experiments (
        id, project_id, experiment_number, title, question, hypothesis, method,
        model, dataset, metric, result, status, notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        project_id || null,
        experiment_number || `EXP. ${Math.floor(Math.random() * 900 + 100)}`,
        title,
        question || '',
        hypothesis || '',
        method || '',
        model || '',
        dataset || '',
        metric || '',
        result || '',
        status,
        notes || '',
        now,
        now
      ]
    );

    const created = await queryOne(`SELECT * FROM experiments WHERE id = ?`, [id]);
    res.status(201).json({ success: true, message: 'Experiment created', data: created });
  } catch (err: any) {
    console.error('Error creating experiment:', err);
    res.status(500).json({ success: false, message: 'Failed to create experiment' });
  }
});

// PUT /api/experiments/:id (Admin)
experimentRouter.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await queryOne(`SELECT * FROM experiments WHERE id = ?`, [id]);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Experiment not found' });
      return;
    }

    const {
      project_id,
      experiment_number,
      title,
      question,
      hypothesis,
      method,
      model,
      dataset,
      metric,
      result,
      status,
      notes
    } = req.body;

    const now = new Date().toISOString();

    await runQuery(
      `UPDATE experiments SET
        project_id = ?,
        experiment_number = ?,
        title = ?,
        question = ?,
        hypothesis = ?,
        method = ?,
        model = ?,
        dataset = ?,
        metric = ?,
        result = ?,
        status = ?,
        notes = ?,
        updated_at = ?
       WHERE id = ?`,
      [
        project_id !== undefined ? project_id : existing.project_id,
        experiment_number ?? existing.experiment_number,
        title ?? existing.title,
        question ?? existing.question,
        hypothesis ?? existing.hypothesis,
        method ?? existing.method,
        model ?? existing.model,
        dataset ?? existing.dataset,
        metric ?? existing.metric,
        result ?? existing.result,
        status ?? existing.status,
        notes ?? existing.notes,
        now,
        id
      ]
    );

    const updated = await queryOne(`SELECT * FROM experiments WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Experiment updated successfully', data: updated });
  } catch (err: any) {
    console.error('Error updating experiment:', err);
    res.status(500).json({ success: false, message: 'Failed to update experiment' });
  }
});

// DELETE /api/experiments/:id (Admin)
experimentRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await runQuery(`DELETE FROM experiments WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Experiment deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to delete experiment' });
  }
});
