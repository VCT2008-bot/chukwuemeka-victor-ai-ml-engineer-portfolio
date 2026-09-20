import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import {
  Terminal,
  Activity,
  Layers,
  FlaskConical,
  Wrench,
  BookOpen,
  Mail,
  Upload,
  FileText,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  RefreshCw,
  Lock,
  ExternalLink
} from 'lucide-react';

interface AdminCMSProps {
  onBackToPublic: () => void;
}

type TabType =
  | 'status'
  | 'projects'
  | 'experiments'
  | 'skills'
  | 'learning'
  | 'resume'
  | 'media'
  | 'messages';

export const AdminCMS: React.FC<AdminCMSProps> = ({ onBackToPublic }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('status');
  const [loading, setLoading] = useState(true);

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiments, setExperiments] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [learningLogs, setLearningLogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [activeResume, setActiveResume] = useState<any>(null);

  // Active edit / create modal or form state
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [isCreatingExp, setIsCreatingExp] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    checkCurrentAuth();
  }, []);

  const checkCurrentAuth = async () => {
    setLoading(true);
    const currentUser = await api.checkAuth();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      await loadAllAdminData();
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const loadAllAdminData = async () => {
    try {
      const [st, prjs, exps, sks, lrn, msgs, med, res] = await Promise.all([
        api.getStats().catch(() => null),
        api.getProjects({ includeUnpublished: true }).catch(() => []),
        api.getExperiments().catch(() => []),
        api.getSkills().catch(() => ({ skills: [] })),
        api.getLearningLog().catch(() => []),
        api.getContactMessages().catch(() => []),
        api.getMedia().catch(() => []),
        api.getResume().catch(() => null)
      ]);

      setStats(st);
      setProjects(prjs);
      setExperiments(exps);
      setSkills(sks.skills || []);
      setLearningLogs(lrn);
      setMessages(msgs);
      setMediaList(med);
      setActiveResume(res);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await api.login(identifier, password);
      setUser(res.user);
      setIsAuthenticated(true);
      await loadAllAdminData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const flashMessage = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Login view if unauthenticated
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center p-4 font-mono text-[#181A1B]">
        <div className="bg-[#FFFFFF] border border-[#E5E1D8] w-full max-w-md p-8 rounded-xs shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E1D8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#C04A2A] rounded-full animate-pulse" />
              <span className="font-bold text-sm tracking-wider uppercase">LAB CONTROL ACCESS</span>
            </div>
            <button
              onClick={onBackToPublic}
              className="text-xs text-[#87909C] hover:text-[#181A1B] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>
          </div>

          <div className="text-xs text-[#555C66] leading-relaxed">
            Restricted engineering control room. Enter cryptographic laboratory credentials to manage projects,
            experiments, metrics, and incoming communications.
          </div>

          {loginError && (
            <div className="p-3 bg-[#F9EFEB] border border-[#C04A2A]/30 text-[#C04A2A] text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase text-[10px] text-[#87909C] mb-1">OPERATOR ID / USERNAME:</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter operator username or email"
                required
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#181A1B]"
              />
            </div>

            <div>
              <label className="block uppercase text-[10px] text-[#87909C] mb-1">SECURITY PASSPHRASE:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passphrase"
                required
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#181A1B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#181A1B] text-[#F8F7F4] text-xs font-bold tracking-wider hover:bg-[#C04A2A] transition-colors rounded-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>AUTHENTICATE & ENTER LAB CONTROL</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#181A1B] font-mono flex flex-col">
      {/* Top Telemetry Bar */}
      <header className="bg-[#FFFFFF] border-b border-[#E5E1D8] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#C04A2A] rounded-xs animate-pulse" />
          <div>
            <span className="font-bold text-sm tracking-wider uppercase">LAB CONTROL ROOM</span>
            <span className="text-[10px] text-[#87909C] ml-2">SYSTEM ACTIVE · OPERATOR: {user?.username}</span>
          </div>
        </div>

        {statusMessage && (
          <div className="px-3 py-1 bg-[#F9EFEB] border border-[#C04A2A]/30 text-[#C04A2A] text-xs rounded-xs flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => loadAllAdminData().then(() => flashMessage('Telemetry refreshed'))}
            className="p-1.5 text-[#555C66] hover:text-[#181A1B] border border-[#E5E1D8] rounded-xs bg-[#FFFFFF] cursor-pointer"
            title="Refresh database state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onBackToPublic}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EFE9] border border-[#E5E1D8] hover:bg-[#181A1B] hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[#C04A2A] border border-[#C04A2A]/30 hover:bg-[#C04A2A] hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Session</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs divide-y divide-[#E5E1D8] shadow-xs">
          <div className="p-3 bg-[#F2EFE9] text-[10px] font-bold uppercase tracking-wider text-[#87909C]">
            CONTROL MODULES
          </div>

          <nav className="p-2 space-y-1">
            {[
              { id: 'status', label: 'SYSTEM STATUS', icon: Activity, count: null },
              { id: 'projects', label: 'PROJECTS', icon: Layers, count: projects.length },
              { id: 'experiments', label: 'EXPERIMENTS', icon: FlaskConical, count: experiments.length },
              { id: 'skills', label: 'TOOLBOX & SKILLS', icon: Wrench, count: skills.length },
              { id: 'learning', label: 'LEARNING LOG', icon: BookOpen, count: learningLogs.length },
              { id: 'messages', label: 'LAB INBOX', icon: Mail, count: messages.filter((m) => !m.is_read).length },
              { id: 'resume', label: 'RESUME & PDF', icon: FileText, count: null },
              { id: 'media', label: 'MEDIA VAULT', icon: Upload, count: mediaList.length }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between rounded-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#181A1B] text-[#F8F7F4] font-bold'
                      : 'text-[#555C66] hover:bg-[#F2EFE9] hover:text-[#181A1B]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-xs ${
                        isActive
                          ? 'bg-[#C04A2A] text-white'
                          : 'bg-[#F2EFE9] text-[#87909C] border border-[#E5E1D8]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Panel */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: SYSTEM STATUS */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E1D8]">
                  <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                    LAB CONTROL · SYSTEM STATUS
                  </h3>
                  <span className="text-[10px] text-[#C04A2A] bg-[#F9EFEB] px-2 py-0.5 rounded-xs font-bold">
                    HEALTHY · {stats?.status || 'ONLINE'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                    <span className="text-[10px] text-[#87909C] uppercase block mb-1">TOTAL PROJECTS</span>
                    <span className="text-2xl font-serif text-[#181A1B] font-bold">
                      {String(stats?.projects || projects.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                    <span className="text-[10px] text-[#87909C] uppercase block mb-1">EXPERIMENT RUNS</span>
                    <span className="text-2xl font-serif text-[#181A1B] font-bold">
                      {String(stats?.experiments || experiments.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                    <span className="text-[10px] text-[#87909C] uppercase block mb-1">LEARNING TOPICS</span>
                    <span className="text-2xl font-serif text-[#181A1B] font-bold">
                      {String(stats?.learningEntries || learningLogs.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                    <span className="text-[10px] text-[#87909C] uppercase block mb-1">UNREAD INBOX</span>
                    <span className="text-2xl font-serif text-[#C04A2A] font-bold">
                      {String(stats?.unreadMessages || 0).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Storage and Runtime Details */}
                <div className="p-4 bg-[#F2EFE9] border border-[#E5E1D8] rounded-xs text-xs space-y-2">
                  <div className="flex justify-between pb-1 border-b border-[#E5E1D8]">
                    <span className="text-[#87909C]">DATABASE ENGINE:</span>
                    <span className="font-bold text-[#181A1B]">{stats?.engine || 'SQLite 3 (WASM Persistence)'}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-[#E5E1D8]">
                    <span className="text-[#87909C]">AUTHENTICATION:</span>
                    <span className="font-bold text-[#181A1B]">Cryptographic HMAC-SHA256 (JWT)</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-[#E5E1D8]">
                    <span className="text-[#87909C]">ACTIVE OPERATOR:</span>
                    <span className="font-bold text-[#181A1B]">Chukwuemeka Victor (Admin)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#87909C]">STORAGE DIRECTORY:</span>
                    <span className="font-bold text-[#181A1B]">/database/portfolio.sqlite + /uploads/</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  PROJECTS & CASE STUDIES ({projects.length})
                </h3>
                <button
                  onClick={() => setIsCreatingProject(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#181A1B] text-[#F8F7F4] text-xs rounded-xs hover:bg-[#C04A2A] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Project</span>
                </button>
              </div>

              {/* Create/Edit Project Form */}
              {(isCreatingProject || editingProject) && (
                <div className="bg-[#FFFFFF] border-2 border-[#181A1B] p-6 rounded-xs shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
                    <span className="font-bold text-xs uppercase">
                      {isCreatingProject ? 'CREATE NEW PROJECT' : `EDIT: ${editingProject.title}`}
                    </span>
                    <button
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="text-xs text-[#87909C] hover:text-[#181A1B] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const payload = {
                        title: formData.get('title'),
                        slug: formData.get('slug'),
                        subtitle: formData.get('subtitle'),
                        category: formData.get('category'),
                        description: formData.get('description'),
                        full_description: formData.get('full_description'),
                        problem: formData.get('problem'),
                        dataset: formData.get('dataset'),
                        approach: formData.get('approach'),
                        implementation: formData.get('implementation'),
                        results: formData.get('results'),
                        limitations: formData.get('limitations'),
                        lessons_learned: formData.get('lessons_learned'),
                        github_url: formData.get('github_url'),
                        live_url: formData.get('live_url'),
                        cover_image: formData.get('cover_image'),
                        featured: formData.get('featured') === 'on',
                        published: formData.get('published') === 'on'
                      };

                      try {
                        if (isCreatingProject) {
                          await api.createProject(payload);
                          flashMessage('Project created successfully');
                        } else {
                          await api.updateProject(editingProject.id, payload);
                          flashMessage('Project updated successfully');
                        }
                        setIsCreatingProject(false);
                        setEditingProject(null);
                        await loadAllAdminData();
                      } catch (err: any) {
                        alert(err.message || 'Operation failed');
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
                  >
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">PROJECT TITLE:</label>
                      <input
                        name="title"
                        defaultValue={editingProject?.title || ''}
                        required
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">SLUG (URL KEY):</label>
                      <input
                        name="slug"
                        defaultValue={editingProject?.slug || ''}
                        placeholder="e.g., pathosense"
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">CATEGORY:</label>
                      <input
                        name="category"
                        defaultValue={editingProject?.category || 'Computer Vision · Deep Learning'}
                        required
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">SHORT SUBTITLE:</label>
                      <input
                        name="subtitle"
                        defaultValue={editingProject?.subtitle || ''}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">SUMMARY DESCRIPTION:</label>
                      <textarea
                        name="description"
                        defaultValue={editingProject?.description || ''}
                        rows={2}
                        required
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">THE QUESTION / PROBLEM:</label>
                      <textarea
                        name="problem"
                        defaultValue={editingProject?.problem || ''}
                        rows={2}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">DATASET USED:</label>
                      <textarea
                        name="dataset"
                        defaultValue={editingProject?.dataset || ''}
                        rows={2}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">RESULTS & EVALUATION:</label>
                      <textarea
                        name="results"
                        defaultValue={editingProject?.results || ''}
                        rows={2}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">GITHUB REPOSITORY URL:</label>
                      <input
                        name="github_url"
                        defaultValue={editingProject?.github_url || ''}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">LIVE APPLICATION URL:</label>
                      <input
                        name="live_url"
                        defaultValue={editingProject?.live_url || ''}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div className="flex items-center gap-6 sm:col-span-2 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="published"
                          defaultChecked={editingProject ? !!editingProject.published : true}
                        />
                        <span>PUBLISHED (VISIBLE ON PUBLIC SITE)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          defaultChecked={editingProject ? !!editingProject.featured : false}
                        />
                        <span>FEATURE ON HOMEPAGE</span>
                      </label>
                    </div>

                    <div className="sm:col-span-2 pt-3 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingProject(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-2 border border-[#E5E1D8] rounded-xs hover:bg-[#F2EFE9] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#181A1B] text-[#F8F7F4] rounded-xs hover:bg-[#C04A2A] cursor-pointer font-bold"
                      >
                        {isCreatingProject ? 'Create Project Record' : 'Save Project Updates'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Projects List Table */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs overflow-hidden shadow-xs divide-y divide-[#E5E1D8]">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-[#181A1B]">{p.title}</span>
                        <span className="text-[10px] text-[#87909C]">/{p.slug}</span>
                        {p.published ? (
                          <span className="text-[9px] bg-[#F2EFE9] text-[#181A1B] border border-[#E5E1D8] px-1.5 py-0.2 rounded-xs">
                            PUBLISHED
                          </span>
                        ) : (
                          <span className="text-[9px] bg-[#F9EFEB] text-[#C04A2A] border border-[#C04A2A]/30 px-1.5 py-0.2 rounded-xs">
                            DRAFT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#555C66] line-clamp-1">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingProject(p)}
                        className="p-1.5 text-[#555C66] hover:text-[#181A1B] border border-[#E5E1D8] rounded-xs hover:bg-[#F8F7F4] cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete project "${p.title}"?`)) {
                            await api.deleteProject(p.id);
                            flashMessage('Project deleted');
                            await loadAllAdminData();
                          }
                        }}
                        className="p-1.5 text-[#C04A2A] hover:bg-[#F9EFEB] border border-[#E5E1D8] rounded-xs cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIMENTS */}
          {activeTab === 'experiments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  LABORATORY EXPERIMENT LOGS ({experiments.length})
                </h3>
                <button
                  onClick={() => setIsCreatingExp(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#181A1B] text-[#F8F7F4] text-xs rounded-xs hover:bg-[#C04A2A] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log New Experiment</span>
                </button>
              </div>

              {/* Create/Edit Experiment Form */}
              {(isCreatingExp || editingExp) && (
                <div className="bg-[#FFFFFF] border-2 border-[#181A1B] p-6 rounded-xs shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
                    <span className="font-bold text-xs uppercase">
                      {isCreatingExp ? 'RECORD NEW EXPERIMENT' : `EDIT: ${editingExp.experiment_number}`}
                    </span>
                    <button
                      onClick={() => {
                        setIsCreatingExp(false);
                        setEditingExp(null);
                      }}
                      className="text-xs text-[#87909C] hover:text-[#181A1B] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const payload = {
                        experiment_number: formData.get('experiment_number'),
                        title: formData.get('title'),
                        project_id: formData.get('project_id') || null,
                        question: formData.get('question'),
                        hypothesis: formData.get('hypothesis'),
                        model: formData.get('model'),
                        dataset: formData.get('dataset'),
                        metric: formData.get('metric'),
                        result: formData.get('result'),
                        status: formData.get('status'),
                        notes: formData.get('notes')
                      };

                      try {
                        if (isCreatingExp) {
                          await api.createExperiment(payload);
                          flashMessage('Experiment recorded');
                        } else {
                          await api.updateExperiment(editingExp.id, payload);
                          flashMessage('Experiment updated');
                        }
                        setIsCreatingExp(false);
                        setEditingExp(null);
                        await loadAllAdminData();
                      } catch (err: any) {
                        alert(err.message || 'Operation failed');
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
                  >
                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">EXPERIMENT NUMBER:</label>
                      <input
                        name="experiment_number"
                        defaultValue={editingExp?.experiment_number || `EXP. 00${experiments.length + 1}`}
                        required
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">STATUS:</label>
                      <select
                        name="status"
                        defaultValue={editingExp?.status || 'Completed'}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      >
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Exploring">Exploring</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">EXPERIMENT TITLE:</label>
                      <input
                        name="title"
                        defaultValue={editingExp?.title || ''}
                        required
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">ATTACH TO PROJECT:</label>
                      <select
                        name="project_id"
                        defaultValue={editingExp?.project_id || ''}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      >
                        <option value="">None (Independent Experiment)</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">MODEL ARCHITECTURE:</label>
                      <input
                        name="model"
                        defaultValue={editingExp?.model || ''}
                        placeholder="e.g., PyTorch 3-Stage CNN"
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">HYPOTHESIS / QUESTION:</label>
                      <textarea
                        name="question"
                        defaultValue={editingExp?.question || ''}
                        rows={2}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">EVALUATION METRIC:</label>
                      <input
                        name="metric"
                        defaultValue={editingExp?.metric || ''}
                        placeholder="e.g., F1 Score, Accuracy"
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">VERIFIED RESULT:</label>
                      <input
                        name="result"
                        defaultValue={editingExp?.result || ''}
                        placeholder="e.g., ~93.78% Val Accuracy"
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#87909C] uppercase mb-1">TECHNICAL OBSERVATIONS / NOTES:</label>
                      <textarea
                        name="notes"
                        defaultValue={editingExp?.notes || ''}
                        rows={2}
                        className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-3 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingExp(false);
                          setEditingExp(null);
                        }}
                        className="px-4 py-2 border border-[#E5E1D8] rounded-xs hover:bg-[#F2EFE9] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#181A1B] text-[#F8F7F4] rounded-xs hover:bg-[#C04A2A] cursor-pointer font-bold"
                      >
                        {isCreatingExp ? 'Record in Notebook' : 'Update Experiment Entry'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Experiments List */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs overflow-hidden shadow-xs divide-y divide-[#E5E1D8]">
                {experiments.map((exp) => (
                  <div key={exp.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-[#C04A2A]">{exp.experiment_number}</span>
                        <span className="font-bold text-sm text-[#181A1B]">{exp.title}</span>
                        <span className="text-[9px] bg-[#F2EFE9] px-1.5 py-0.2 border border-[#E5E1D8] rounded-xs">
                          {exp.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#555C66]">
                        {exp.model} · Result: <strong className="text-[#181A1B]">{exp.result}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingExp(exp)}
                        className="p-1.5 text-[#555C66] hover:text-[#181A1B] border border-[#E5E1D8] rounded-xs hover:bg-[#F8F7F4] cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete experiment ${exp.experiment_number}?`)) {
                            await api.deleteExperiment(exp.id);
                            flashMessage('Experiment deleted');
                            await loadAllAdminData();
                          }
                        }}
                        className="p-1.5 text-[#C04A2A] hover:bg-[#F9EFEB] border border-[#E5E1D8] rounded-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TOOLBOX & SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  CURRENT TOOLBOX & SKILLS ({skills.length})
                </h3>
              </div>

              {/* Add Skill Form */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs shadow-xs">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                    const explanation = (form.elements.namedItem('explanation') as HTMLInputElement).value;
                    try {
                      await api.createSkill({ name, category, explanation, tags: [category] });
                      form.reset();
                      flashMessage('Tool added to toolbox');
                      await loadAllAdminData();
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
                >
                  <input
                    name="name"
                    placeholder="Tool Name (e.g., PyTorch)"
                    required
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  />
                  <select
                    name="category"
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  >
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Data">Data</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Applications">Applications</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                  <input
                    name="explanation"
                    placeholder="Concrete practical explanation"
                    required
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#181A1B] text-[#F8F7F4] rounded-xs hover:bg-[#C04A2A] transition-colors cursor-pointer font-bold"
                  >
                    Add Technology
                  </button>
                </form>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#181A1B]">{s.name}</span>
                        <span className="text-[9px] text-[#87909C] bg-[#F2EFE9] px-1 py-0.2 rounded-xs">
                          {s.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555C66] line-clamp-1">{s.explanation}</p>
                    </div>

                    <button
                      onClick={async () => {
                        if (confirm(`Remove ${s.name}?`)) {
                          await api.deleteSkill(s.id);
                          flashMessage('Tool removed');
                          await loadAllAdminData();
                        }
                      }}
                      className="p-1 text-[#C04A2A] hover:bg-[#F9EFEB] rounded-xs cursor-pointer ml-2 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LEARNING LOG */}
          {activeTab === 'learning' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  CURRENTLY IN THE LAB / ACTIVE LEARNING ({learningLogs.length})
                </h3>
              </div>

              {/* Add Learning Log Form */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs shadow-xs">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const topic = (form.elements.namedItem('topic') as HTMLInputElement).value;
                    const domain = (form.elements.namedItem('domain') as HTMLInputElement).value;
                    const status = (form.elements.namedItem('status') as HTMLSelectElement).value;
                    const focus_area = (form.elements.namedItem('focus_area') as HTMLInputElement).value;
                    const notes = (form.elements.namedItem('notes') as HTMLInputElement).value;

                    try {
                      await api.createLearningEntry({
                        topic,
                        domain: domain.toUpperCase(),
                        status,
                        focus_area,
                        notes,
                        date: 'SEPTEMBER 2026'
                      });
                      form.reset();
                      flashMessage('Learning entry logged');
                      await loadAllAdminData();
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
                >
                  <input
                    name="topic"
                    placeholder="Topic (e.g. Model Explainability)"
                    required
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  />
                  <input
                    name="domain"
                    placeholder="Domain (e.g. COMPUTER VISION)"
                    required
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  />
                  <select
                    name="status"
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  >
                    <option value="Building">Building</option>
                    <option value="Exploring">Exploring</option>
                    <option value="Practicing">Practicing</option>
                  </select>
                  <input
                    name="focus_area"
                    placeholder="Focus area summary"
                    required
                    className="px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  />
                  <input
                    name="notes"
                    placeholder="Technical study notes"
                    className="sm:col-span-2 px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-2 py-2 bg-[#181A1B] text-[#F8F7F4] rounded-xs hover:bg-[#C04A2A] cursor-pointer font-bold"
                  >
                    Add Learning Log Entry
                  </button>
                </form>
              </div>

              {/* Logs List */}
              <div className="space-y-2">
                {learningLogs.map((l) => (
                  <div
                    key={l.id}
                    className="p-3 bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#181A1B]">{l.topic}</span>
                        <span className="text-[9px] text-[#C04A2A] font-bold bg-[#F9EFEB] px-1.5 py-0.2 rounded-xs">
                          {l.status}
                        </span>
                        <span className="text-[9px] text-[#87909C]">{l.domain}</span>
                      </div>
                      <p className="text-xs text-[#555C66] mt-0.5">{l.focus_area}</p>
                    </div>

                    <button
                      onClick={async () => {
                        if (confirm(`Delete learning entry ${l.topic}?`)) {
                          await api.deleteLearningEntry(l.id);
                          flashMessage('Entry deleted');
                          await loadAllAdminData();
                        }
                      }}
                      className="p-1 text-[#C04A2A] hover:bg-[#F9EFEB] rounded-xs cursor-pointer ml-2 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LAB INBOX (CONTACT MESSAGES) */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  INCOMING CONTACT INQUIRIES ({messages.length})
                </h3>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs text-center text-xs text-[#87909C]">
                  No inquiries logged yet. Submissions to POST /api/contact will appear here.
                </div>
              ) : (
                <div className="bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs divide-y divide-[#E5E1D8] shadow-xs">
                  {messages.map((m) => (
                    <div key={m.id} className="p-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              m.is_read ? 'bg-[#D1CBC0]' : 'bg-[#C04A2A] animate-ping'
                            }`}
                          />
                          <strong className="text-xs text-[#181A1B]">{m.name}</strong>
                          <span className="text-xs text-[#87909C]">&lt;{m.email}&gt;</span>
                        </div>
                        <span className="text-[10px] text-[#87909C]">{m.created_at}</span>
                      </div>

                      <div className="font-bold text-xs text-[#181A1B]">Subject: {m.subject}</div>

                      <p className="text-xs text-[#555C66] bg-[#F8F7F4] p-3 border border-[#E5E1D8] rounded-xs whitespace-pre-wrap">
                        {m.message}
                      </p>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        {!m.is_read && (
                          <button
                            onClick={async () => {
                              await api.markMessageRead(m.id);
                              flashMessage('Marked as read');
                              await loadAllAdminData();
                            }}
                            className="px-2 py-1 text-[10px] border border-[#E5E1D8] hover:bg-[#F2EFE9] rounded-xs cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            if (confirm('Delete message?')) {
                              await api.deleteMessage(m.id);
                              flashMessage('Message deleted');
                              await loadAllAdminData();
                            }
                          }}
                          className="px-2 py-1 text-[10px] text-[#C04A2A] hover:bg-[#F9EFEB] border border-[#C04A2A]/30 rounded-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: RESUME UPLOAD */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs shadow-xs space-y-4">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  ACTIVE RESUME DOCUMENT
                </h3>

                <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#87909C] uppercase block mb-0.5">CURRENT SERVED FILE:</span>
                    <p className="font-bold text-xs text-[#181A1B]">
                      {activeResume?.title || 'Chukwuemeka_Victor_Engineering_Profile.pdf'}
                    </p>
                    <span className="text-[10px] text-[#87909C]">
                      Target Endpoint: <code>/api/resume/download</code>
                    </span>
                  </div>

                  <a
                    href="/api/resume/download"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E1D8] hover:bg-[#F2EFE9] text-xs rounded-xs"
                  >
                    <span>Download Test</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-[#87909C] uppercase font-bold block mb-2">
                    UPLOAD / REPLACE ACTIVE RESUME PDF:
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        await api.uploadResume(file);
                        flashMessage('Resume PDF updated and active');
                        await loadAllAdminData();
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }}
                    className="block w-full text-xs text-[#555C66] file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-[#181A1B] file:text-white hover:file:bg-[#C04A2A] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: MEDIA VAULT */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#181A1B]">
                  MEDIA VAULT & ASSETS ({mediaList.length})
                </h3>
              </div>

              {/* Upload Input */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs shadow-xs">
                <span className="text-[10px] text-[#87909C] uppercase font-bold block mb-2">
                  UPLOAD NEW IMAGE OR DIAGRAM (PNG, JPG, WEBP, PDF):
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      await api.uploadMedia(file);
                      flashMessage('File uploaded to /uploads/');
                      await loadAllAdminData();
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }}
                  className="block w-full text-xs text-[#555C66] file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-[#181A1B] file:text-white hover:file:bg-[#C04A2A] cursor-pointer"
                />
              </div>

              {/* Media List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mediaList.map((m) => (
                  <div
                    key={m.id}
                    className="bg-[#FFFFFF] border border-[#E5E1D8] p-3 rounded-xs flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-[#181A1B] truncate">{m.original_name}</p>
                      <span className="text-[10px] text-[#87909C] block">{Math.round(m.size / 1024)} KB</span>
                      <code className="text-[9px] text-[#C04A2A] block truncate">{m.url}</code>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E5E1D8]">
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#181A1B] hover:underline flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete asset ${m.original_name}?`)) {
                            await api.deleteMedia(m.id);
                            flashMessage('Asset deleted');
                            await loadAllAdminData();
                          }
                        }}
                        className="text-[10px] text-[#C04A2A] hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
