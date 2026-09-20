import { Router, Request, Response } from 'express';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const projectRouter = Router();

// GET /api/projects
projectRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, includeUnpublished } = req.query;
    let sql = `SELECT * FROM projects WHERE 1=1`;
    const params: any[] = [];

    if (!includeUnpublished) {
      sql += ` AND published = 1`;
    }

    if (category && category !== 'All') {
      sql += ` AND category LIKE ?`;
      params.push(`%${category}%`);
    }

    if (search) {
      sql += ` AND (title LIKE ? OR description LIKE ? OR dataset LIKE ? OR approach LIKE ?)`;
      const searchWildcard = `%${search}%`;
      params.push(searchWildcard, searchWildcard, searchWildcard, searchWildcard);
    }

    sql += ` ORDER BY display_order ASC, created_at DESC`;

    const projects = await queryAll(sql, params);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err: any) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve projects from database' });
  }
});

// GET /api/projects/:slug
projectRouter.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const project = await queryOne(`SELECT * FROM projects WHERE slug = ? OR id = ? LIMIT 1`, [slug, slug]);

    if (!project) {
      res.status(404).json({ success: false, message: `Project with slug '${slug}' not found` });
      return;
    }

    // Also fetch associated experiments
    const experiments = await queryAll(
      `SELECT * FROM experiments WHERE project_id = ? ORDER BY experiment_number ASC`,
      [project.id]
    );

    res.json({ success: true, data: { ...project, experiments } });
  } catch (err: any) {
    console.error('Error fetching project detail:', err);
    res.status(500).json({ success: false, message: 'Database error fetching project details' });
  }
});

// POST /api/projects (Admin)
projectRouter.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      slug,
      subtitle,
      category,
      description,
      full_description,
      problem,
      dataset,
      approach,
      implementation,
      results,
      limitations,
      lessons_learned,
      github_url,
      live_url,
      cover_image,
      featured,
      published,
      display_order
    } = req.body;

    if (!title || !category || !description) {
      res.status(400).json({ success: false, message: 'Title, category, and description are required' });
      return;
    }

    const generatedSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const id = `prj_${Date.now()}`;
    const now = new Date().toISOString();

    await runQuery(
      `INSERT INTO projects (
        id, slug, title, subtitle, category, description, full_description,
        problem, dataset, approach, implementation, results, limitations, lessons_learned,
        github_url, live_url, cover_image, featured, published, display_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        generatedSlug,
        title,
        subtitle || '',
        category,
        description,
        full_description || '',
        problem || '',
        dataset || '',
        approach || '',
        implementation || '',
        results || '',
        limitations || '',
        lessons_learned || '',
        github_url || '',
        live_url || '',
        cover_image || '',
        featured ? 1 : 0,
        published !== undefined ? (published ? 1 : 0) : 1,
        display_order || 0,
        now,
        now
      ]
    );

    const created = await queryOne(`SELECT * FROM projects WHERE id = ?`, [id]);
    res.status(201).json({ success: true, message: 'Project created successfully', data: created });
  } catch (err: any) {
    console.error('Error creating project:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to create project' });
  }
});

// PUT /api/projects/:id (Admin)
projectRouter.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await queryOne(`SELECT * FROM projects WHERE id = ?`, [id]);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    const now = new Date().toISOString();
    const {
      title,
      slug,
      subtitle,
      category,
      description,
      full_description,
      problem,
      dataset,
      approach,
      implementation,
      results,
      limitations,
      lessons_learned,
      github_url,
      live_url,
      cover_image,
      featured,
      published,
      display_order
    } = req.body;

    await runQuery(
      `UPDATE projects SET
        title = ?,
        slug = ?,
        subtitle = ?,
        category = ?,
        description = ?,
        full_description = ?,
        problem = ?,
        dataset = ?,
        approach = ?,
        implementation = ?,
        results = ?,
        limitations = ?,
        lessons_learned = ?,
        github_url = ?,
        live_url = ?,
        cover_image = ?,
        featured = ?,
        published = ?,
        display_order = ?,
        updated_at = ?
       WHERE id = ?`,
      [
        title ?? existing.title,
        slug ?? existing.slug,
        subtitle ?? existing.subtitle,
        category ?? existing.category,
        description ?? existing.description,
        full_description ?? existing.full_description,
        problem ?? existing.problem,
        dataset ?? existing.dataset,
        approach ?? existing.approach,
        implementation ?? existing.implementation,
        results ?? existing.results,
        limitations ?? existing.limitations,
        lessons_learned ?? existing.lessons_learned,
        github_url ?? existing.github_url,
        live_url ?? existing.live_url,
        cover_image ?? existing.cover_image,
        featured !== undefined ? (featured ? 1 : 0) : existing.featured,
        published !== undefined ? (published ? 1 : 0) : existing.published,
        display_order !== undefined ? display_order : existing.display_order,
        now,
        id
      ]
    );

    const updated = await queryOne(`SELECT * FROM projects WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (err: any) {
    console.error('Error updating project:', err);
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id (Admin)
projectRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await queryOne(`SELECT id FROM projects WHERE id = ?`, [id]);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    await runQuery(`DELETE FROM projects WHERE id = ?`, [id]);
    await runQuery(`DELETE FROM experiments WHERE project_id = ?`, [id]);
    res.json({ success: true, message: 'Project and associated experiments deleted' });
  } catch (err: any) {
    console.error('Error deleting project:', err);
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
});
