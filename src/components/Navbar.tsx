import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText, Terminal } from 'lucide-react';

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'lab', label: 'The Lab' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'toolbox', label: 'Toolbox' },
    { id: 'process', label: 'Process' },
    { id: 'failures', label: 'What Failed' },
    { id: 'learning', label: 'Log' },
    { id: 'open-work', label: 'Work' },
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

  return (
    <header
      id="main-nav-header"
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#F8F7F4]/95 backdrop-blur-md border-[#E5E1D8] py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
          : 'bg-[#F8F7F4] border-[#E5E1D8]/60 py-3'
      }`}
    >
      {/* Top Laboratory Spectrum Hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#C04A2A] via-[#E11D48] via-[#2563EB] via-[#059669] to-[#D97706]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              id="nav-brand-button"
              onClick={() => {
                if (isCaseStudyOpen) onBackToMain();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C04A2A]"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-gradient-to-br from-[#C04A2A] to-[#E11D48] rounded-xs shadow-xs" />
                <span className="font-mono text-xs tracking-wider uppercase text-[#181A1B] font-bold group-hover:text-[#C04A2A] transition-colors">
                  CHUKWUEMEKA VICTOR
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-[#047857] border border-[#A7F3D0] px-1.5 py-0.5 rounded-xs bg-[#ECFDF5] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  ML LAB · VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-[#555C66] font-mono tracking-tight pl-4.5">
                Engineering Notebook & Experiment Log
              </p>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wide transition-colors rounded-xs cursor-pointer ${
                  activeSection === item.id && !isCaseStudyOpen
                    ? 'text-[#C04A2A] font-semibold bg-[#F9EFEB]'
                    : 'text-[#555C66] hover:text-[#181A1B] hover:bg-[#F2EFE9]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-[#E5E1D8] mx-2" />

            <button
              id="nav-resume-btn"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#181A1B] hover:text-[#C04A2A] hover:bg-[#F2EFE9] rounded-xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </nav>

          {/* Right Action / Contact */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenAdmin && (
              <button
                id="nav-admin-btn"
                onClick={onOpenAdmin}
                className="text-[11px] font-mono text-[#87909C] hover:text-[#181A1B] border border-[#E5E1D8] hover:border-[#181A1B] px-2 py-1 rounded-xs transition-colors cursor-pointer"
                title="Lab Control Room / Admin CMS"
              >
                [LAB CTRL]
              </button>
            )}

            <a
              id="nav-github-link"
              href="https://github.com/chukwuemekavictor"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#555C66] hover:text-[#181A1B] transition-colors py-1.5 px-2"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#87909C]" />
            </a>

            <button
              id="nav-contact-btn"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono bg-[#181A1B] text-[#F8F7F4] hover:bg-[#C04A2A] transition-colors rounded-xs cursor-pointer shadow-xs"
            >
              <Terminal className="w-3 h-3 text-[#C04A2A]" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#555C66] hover:text-[#181A1B] hover:bg-[#F2EFE9] rounded-xs focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-panel"
            className="md:hidden pt-3 pb-4 border-t border-[#E5E1D8] mt-3 space-y-1"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-2 text-xs font-mono text-[#555C66] hover:text-[#181A1B] hover:bg-[#F2EFE9] rounded-xs"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-[#E5E1D8] flex flex-col gap-2">
              <button
                id="mobile-nav-resume"
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-mono text-[#181A1B] flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#C04A2A]" />
                <span>View Engineering Resume</span>
              </button>

              <button
                id="mobile-nav-contact"
                onClick={() => handleNavClick('contact')}
                className="w-full text-center px-4 py-2 text-xs font-mono bg-[#181A1B] text-[#F8F7F4] hover:bg-[#C04A2A] rounded-xs"
              >
                Contact / Technical Inquiries
              </button>

              {onOpenAdmin && (
                <button
                  id="mobile-nav-admin"
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 text-xs font-mono border border-[#E5E1D8] text-[#87909C] hover:text-[#181A1B] hover:bg-[#F2EFE9] rounded-xs"
                >
                  [LAB CONTROL ROOM / ADMIN]
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
