import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

let dbInstance: Database | null = null;
const dbDir = path.resolve(process.cwd(), 'database');
const dbFilePath = path.join(dbDir, 'portfolio.sqlite');

export async function getDb(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (fs.existsSync(dbFilePath)) {
    const fileBuffer = fs.readFileSync(dbFilePath);
    dbInstance = new SQL.Database(fileBuffer);
  } else {
    dbInstance = new SQL.Database();
  }

  // Ensure tables exist
  initSchema(dbInstance);
  saveDb();

  return dbInstance;
}

export function saveDb(): void {
  if (!dbInstance) return;
  try {
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbFilePath, buffer);
  } catch (err) {
    console.error('Failed to persist database file:', err);
  }
}

function initSchema(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      full_description TEXT,
      problem TEXT,
      dataset TEXT,
      approach TEXT,
      implementation TEXT,
      results TEXT,
      limitations TEXT,
      lessons_learned TEXT,
      github_url TEXT,
      live_url TEXT,
      cover_image TEXT,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS experiments (
      id TEXT PRIMARY KEY,
      project_id TEXT,
      experiment_number TEXT NOT NULL,
      title TEXT NOT NULL,
      question TEXT,
      hypothesis TEXT,
      method TEXT,
      model TEXT,
      dataset TEXT,
      metric TEXT,
      result TEXT,
      status TEXT NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      explanation TEXT NOT NULL,
      tags TEXT,
      display_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS learning_log (
      id TEXT PRIMARY KEY,
      topic TEXT NOT NULL,
      domain TEXT NOT NULL,
      status TEXT NOT NULL,
      focus_area TEXT NOT NULL,
      notes TEXT NOT NULL,
      date TEXT NOT NULL,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS education (
      id TEXT PRIMARY KEY,
      institution TEXT NOT NULL,
      degree TEXT NOT NULL,
      period TEXT NOT NULL,
      location TEXT NOT NULL,
      details TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS certifications (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      date TEXT NOT NULL,
      credential TEXT,
      certificate_url TEXT,
      description TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS resume (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      file_url TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      uploaded_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      url TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

/**
 * Execute a SELECT query and return structured JS objects
 */
export async function queryAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = await getDb();
  const stmt = db.prepare(sql);
  if (params && params.length > 0) {
    stmt.bind(params);
  }

  const results: T[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as T);
  }
  stmt.free();
  return results;
}

/**
 * Execute a SELECT query that returns at most one record
 */
export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const list = await queryAll<T>(sql, params);
  return list.length > 0 ? list[0] : null;
}

/**
 * Execute INSERT, UPDATE, or DELETE and persist to disk
 */
export async function runQuery(sql: string, params: any[] = []): Promise<void> {
  const db = await getDb();
  if (params && params.length > 0) {
    db.run(sql, params);
  } else {
    db.run(sql);
  }
  saveDb();
}
