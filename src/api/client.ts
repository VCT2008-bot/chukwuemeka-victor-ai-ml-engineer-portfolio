/**
 * Client API Layer for Victor's Laboratory Portfolio
 * Connects frontend views directly to the Express + SQLite backend.
 */

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('lab_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export const api = {
  // Public Data Endpoints
  async getProjects(params?: { category?: string; search?: string; includeUnpublished?: boolean }): Promise<any[]> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.includeUnpublished) query.set('includeUnpublished', 'true');

    const res = await fetch(`${API_BASE}/projects?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const json: ApiResponse<any[]> = await res.json();
    return json.data || [];
  },

  async getProjectBySlug(slug: string): Promise<any> {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (!res.ok) throw new Error(`Project ${slug} not found`);
    const json: ApiResponse<any> = await res.json();
    return json.data;
  },

  async getExperiments(params?: { status?: string; search?: string; project_id?: string }): Promise<any[]> {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    if (params?.project_id) query.set('project_id', params.project_id);

    const res = await fetch(`${API_BASE}/experiments?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch experiments');
    const json: ApiResponse<any[]> = await res.json();
    return json.data || [];
  },

  async getSkills(): Promise<{ skills: any[]; grouped: any[] }> {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    const json = await res.json();
    return { skills: json.data || [], grouped: json.grouped || [] };
  },

  async getLearningLog(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/learning-log`);
    if (!res.ok) throw new Error('Failed to fetch learning log');
    const json = await res.json();
    return json.data || [];
  },

  async getSiteSettings(): Promise<Record<string, string>> {
    const res = await fetch(`${API_BASE}/site-settings`);
    if (!res.ok) return {};
    const json = await res.json();
    return json.data || {};
  },

  async getResume(): Promise<any> {
    const res = await fetch(`${API_BASE}/resume`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  },

  async sendContactMessage(payload: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    _gotcha?: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to record message');
    }
    return json;
  },

  // Auth Endpoints
  async login(identifier: string, password: string): Promise<any> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Invalid credentials');
    }
    if (json.token) {
      localStorage.setItem('lab_auth_token', json.token);
      localStorage.setItem('lab_auth_user', JSON.stringify(json.user));
    }
    return json;
  },

  async checkAuth(): Promise<any> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) {
      localStorage.removeItem('lab_auth_token');
      localStorage.removeItem('lab_auth_user');
      return null;
    }
    const json = await res.json();
    return json.user;
  },

  logout(): void {
    localStorage.removeItem('lab_auth_token');
    localStorage.removeItem('lab_auth_user');
  },

  // Admin Control Room Operations
  async getStats(): Promise<any> {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Unauthorized or failed to fetch telemetry');
    const json = await res.json();
    return json.data;
  },

  async createProject(projectData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(projectData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create project');
    return json.data;
  },

  async updateProject(id: string, projectData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(projectData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update project');
    return json.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  async createExperiment(expData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/experiments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(expData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create experiment');
    return json.data;
  },

  async updateExperiment(id: string, expData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/experiments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(expData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update experiment');
    return json.data;
  },

  async deleteExperiment(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/experiments/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete experiment');
  },

  async createSkill(skillData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(skillData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create skill');
    return json.data;
  },

  async deleteSkill(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete skill');
  },

  async createLearningEntry(entryData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/learning-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(entryData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create entry');
    return json.data;
  },

  async deleteLearningEntry(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/learning-log/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete learning entry');
  },

  async getContactMessages(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    const json = await res.json();
    return json.data || [];
  },

  async markMessageRead(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/contact/${id}/read`, {
      method: 'PATCH',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to update message');
  },

  async deleteMessage(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/contact/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete message');
  },

  async uploadMedia(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Media upload failed');
    return json.data;
  },

  async getMedia(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/media`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch media');
    const json = await res.json();
    return json.data || [];
  },

  async deleteMedia(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/media/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete media asset');
  },

  async uploadResume(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/resume/upload`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Resume upload failed');
    return json.data;
  }
};
