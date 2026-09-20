import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { seedDatabase } from './server/database/seed.js';
import { authRouter } from './server/routes/authRoutes.js';
import { projectRouter } from './server/routes/projectRoutes.js';
import { experimentRouter } from './server/routes/experimentRoutes.js';
import { skillRouter } from './server/routes/skillRoutes.js';
import { learningRouter } from './server/routes/learningRoutes.js';
import { contactRouter } from './server/routes/contactRoutes.js';
import { mediaRouter } from './server/routes/mediaRoutes.js';
import { systemRouter } from './server/routes/systemRoutes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Ensure uploads directory exists and is statically served
  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // Initialize and auto-seed database with verified records
  try {
    await seedDatabase(false);
  } catch (err) {
    console.error('[DB] Auto-seed check failed:', err);
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', engine: 'Victor Laboratory Server v2.0', uptime: process.uptime() });
  });

  // REST API Routes
  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/experiments', experimentRouter);
  app.use('/api/skills', skillRouter);
  app.use('/api/learning-log', learningRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/media', mediaRouter);
  app.use('/api', systemRouter);

  // Central API error handler for unmatched API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found` });
  });

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LAB SERVER] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[FATAL SERVER ERROR]', err);
  process.exit(1);
});
