import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  FileText,
  Terminal,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenResume: () => void;
  isCaseStudyOpen: boolean;
  onBackToMain: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onOpenResume,
  isCaseStudyOpen,
  onBackToMain,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'lab', label: 'Lab' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'toolbox', label: 'Toolbox' },
    { id: 'process', label: 'Process' },
    { id: 'failures', label: 'What Failed' },
    { id: 'learning', label: 'Learning Log' },
    { id: 'open-work', label: 'Open Work' },
  ];

  const handleNavClick = (id: string) => {
    if (isCaseStudyOpen) {
      onBackToMain();

      setTimeout(() => {
        onNavigate(id);
      }, 100);
    } else {
      onNavigate(id);
    }

    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (onOpenAdmin) {
      onOpenAdmin();
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#F8F7F4]/97 backdrop-blur-md border-[#E5E1D8] shadow-[0_2px_10px_rgba(0,0,0,0.05)]'
          : 'bg-[#F8F7F4] border-[#E5E1D8]/60'
      }`}
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-[#C04A2A] via-[#E11D48] via-[#2563EB] via-[#059669] to-[#D97706]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[68px] flex items-center justify-between gap-4">

          <button
            id="nav-brand-button"
            onClick={() => {
              if (isCaseStudyOpen) {
                onBackToMain();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-left shrink-0 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-gradient-to-br from-[#C04A2A] to-[#E11D48] rounded-sm" />

              <span className="font-mono text-xs sm:text-sm tracking-wide uppercase text-[#181A1B] font-bold">
                CHUKWUEMEKA VICTOR
              </span>
            </div>

            <p className="text-[10px] sm:text-[11px] text-[#555C66] font-mono mt-1">
              AI/ML Engineer · Engineering Notebook
            </p>
          </button>

          <nav
            id="desktop-nav"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-0.5"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-2 text-[11px] font-mono tracking-wide rounded-md transition-all cursor-pointer ${
                  activeSection === item.id && !isCaseStudyOpen
                    ? 'text-[#C04A2A] font-bold bg-[#F9EFEB]'
                    : 'text-[#555C66] hover:text-[#181A1B] hover:bg-[#F2EFE9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">

            <button
              id="nav-resume-btn"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-semibold text-[#181A1B] border border-[#D8D3C9] hover:border-[#C04A2A] hover:text-[#C04A2A] bg-white/40 hover:bg-[#F9EFEB] rounded-md transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>

            {onOpenAdmin && (
              <button
                id="nav-admin-btn"
                onClick={handleAdminClick}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-semibold text-[#181A1B] border border-[#D8D3C9] hover:border-[#181A1B] hover:bg-[#F2EFE9] rounded-md transition-all cursor-pointer"
                title="Open Lab Control Room"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </button>
            )}

            <a
              id="nav-github-link"
              href="https://github.com/chukwuemekavictor"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2 py-2 text-[11px] font-mono text-[#555C66] hover:text-[#181A1B] transition-colors"
            >
              GitHub
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              id="nav-contact-btn"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono font-semibold bg-[#181A1B] text-[#F8F7F4] hover:bg-[#C04A2A] rounded-md transition-colors cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              Contact
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 border border-[#D8D3C9] rounded-md text-[#181A1B] hover:bg-[#F2EFE9]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu-panel"
            className="md:hidden border-t border-[#E5E1D8] py-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 text-xs font-mono rounded-md border ${
                    activeSection === item.id
                      ? 'border-[#C04A2A] text-[#C04A2A] bg-[#F9EFEB]'
                      : 'border-[#E5E1D8] text-[#555C66] bg-white/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">

              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-mono font-semibold border border-[#D8D3C9] rounded-md"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </button>

              {onOpenAdmin && (
                <button
                  onClick={handleAdminClick}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-mono font-semibold border border-[#D8D3C9] rounded-md"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
              )}

              <button
                onClick={() => handleNavClick('contact')}
                className="col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold bg-[#181A1B] text-[#F8F7F4] hover:bg-[#C04A2A] rounded-md"
              >
                <Terminal className="w-3.5 h-3.5" />
                Contact / Collaboration
              </button>

              <a
                href="https://github.com/chukwuemekavictor"
                target="_blank"
                rel="noreferrer"
                className="col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono border border-[#D8D3C9] rounded-md"
              >
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
