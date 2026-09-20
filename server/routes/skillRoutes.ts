import { Router, Request, Response } from 'express';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const skillRouter = Router();

// GET /api/skills
skillRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawSkills = await queryAll(`SELECT * FROM skills ORDER BY display_order ASC, name ASC`);
    const skills = rawSkills.map(s => ({
      ...s,
      tags: s.tags ? JSON.parse(s.tags) : []
    }));

    // Also group by category for easy consumption
    const categories = ['Machine Learning', 'Data', 'Computer Vision', 'Applications', 'Engineering'];
    const grouped = categories.map(cat => ({
      category: cat.toUpperCase(),
      tools: skills.filter(s => s.category.toLowerCase() === cat.toLowerCase())
    }));

    res.json({ success: true, count: skills.length, data: skills, grouped });
  } catch (err: any) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ success: false, message: 'Database error fetching skills' });
  }
});

// POST /api/skills (Admin)
skillRouter.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, explanation, tags, display_order } = req.body;
    if (!name || !category || !explanation) {
      res.status(400).json({ success: false, message: 'Name, category, and explanation are required' });
      return;
    }

    const id = `skl_${Date.now()}`;
    const now = new Date().toISOString();
    const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : JSON.stringify([]);

    await runQuery(
      `INSERT INTO skills (id, name, category, explanation, tags, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, category, explanation, tagsJson, display_order || 0, now, now]
    );

    const created = await queryOne(`SELECT * FROM skills WHERE id = ?`, [id]);
    res.status(201).json({ success: true, message: 'Skill created', data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to create skill' });
  }
});

// PUT /api/skills/:id (Admin)
skillRouter.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await queryOne(`SELECT * FROM skills WHERE id = ?`, [id]);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    const { name, category, explanation, tags, display_order } = req.body;
    const now = new Date().toISOString();
    const tagsJson = tags !== undefined
      ? (Array.isArray(tags) ? JSON.stringify(tags) : JSON.stringify([]))
      : existing.tags;

    await runQuery(
      `UPDATE skills SET
        name = ?,
        category = ?,
        explanation = ?,
        tags = ?,
        display_order = ?,
        updated_at = ?
       WHERE id = ?`,
      [
        name ?? existing.name,
        category ?? existing.category,
        explanation ?? existing.explanation,
        tagsJson,
        display_order !== undefined ? display_order : existing.display_order,
        now,
        id
      ]
    );

    const updated = await queryOne(`SELECT * FROM skills WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Skill updated', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to update skill' });
  }
});

// DELETE /api/skills/:id (Admin)
skillRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await runQuery(`DELETE FROM skills WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to delete skill' });
  }
});
