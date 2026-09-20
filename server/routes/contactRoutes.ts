import { Router, Request, Response } from 'express';
import { queryAll, queryOne, runQuery } from '../database/db.js';
import { requireAuth } from '../auth/authMiddleware.js';

export const contactRouter = Router();

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const limit = 5; // Max 5 submissions per 10 min

  let timestamps = rateLimitMap.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);

  if (timestamps.length >= limit) {
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

// POST /api/contact (Public)
contactRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    if (isRateLimited(ip)) {
      res.status(429).json({
        success: false,
        message: 'Rate limit exceeded. Please wait a few minutes before submitting another inquiry.'
      });
      return;
    }

    const { name, email, subject, message, _gotcha } = req.body;

    // Honeypot spam trap
    if (_gotcha) {
      res.json({ success: true, message: 'Inquiry received.' });
      return;
    }

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
      return;
    }

    // Sanitize length
    const cleanName = String(name).slice(0, 100).trim();
    const cleanEmail = String(email).slice(0, 100).trim();
    const cleanSubject = String(subject || 'Technical Inquiry').slice(0, 200).trim();
    const cleanMessage = String(message).slice(0, 5000).trim();

    const id = `msg_${Date.now()}`;
    const now = new Date().toISOString();

    await runQuery(
      `INSERT INTO contact_messages (id, name, email, subject, message, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, cleanName, cleanEmail, cleanSubject, cleanMessage, 0, now]
    );

    console.log(`[CONTACT] New message logged from ${cleanName} <${cleanEmail}>`);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been securely logged in the laboratory system. Victor will review it shortly.'
    });
  } catch (err: any) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Failed to record message' });
  }
});

// GET /api/contact (Admin)
contactRouter.get('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await queryAll(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// PATCH /api/contact/:id/read (Admin)
contactRouter.patch('/:id/read', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await runQuery(`UPDATE contact_messages SET is_read = 1 WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Message marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// DELETE /api/contact/:id (Admin)
contactRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await runQuery(`DELETE FROM contact_messages WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});
