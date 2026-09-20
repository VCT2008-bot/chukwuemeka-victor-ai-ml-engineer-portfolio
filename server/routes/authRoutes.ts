import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { queryOne, runQuery } from '../database/db.js';
import { generateToken, requireAuth, AuthRequest } from '../auth/authMiddleware.js';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      res.status(400).json({ success: false, message: 'Identifier (username or email) and password are required' });
      return;
    }

    const user = await queryOne(
      `SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1`,
      [identifier, identifier]
    );

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials. Access restricted.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials. Access restricted.' });
      return;
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Authentication service encountered an error' });
  }
});

// GET /api/auth/me
authRouter.get('/me', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await queryOne(`SELECT id, username, email, role, created_at FROM users WHERE id = ?`, [req.user?.id]);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve session info' });
  }
});

// POST /api/auth/logout
authRouter.post('/logout', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' });
});
