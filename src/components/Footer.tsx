import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenResume: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenResume, onOpenAdmin }) => {
  return (
    <footer id="main-footer" className="bg-[#FFFFFF] border-t border-[#E5E1D8] py-12 text-[#555C66] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E5E1D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-[#C04A2A]" />
              <span className="font-bold text-sm text-[#181A1B] uppercase tracking-wider">
                CHUKWUEMEKA VICTOR
              </span>
            </div>
            <p className="text-[11px] text-[#555C66]">
              AI/ML ENGINEER · SOFTWARE BUILDER
            </p>
            <p className="text-[11px] text-[#87909C]">
              Nigeria · Open to technical internships and engineering collaborations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="https://github.com/chukwuemekavictor"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C04A2A] transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/chukwuemekavictor"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C04A2A] transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <button
              onClick={onOpenResume}
              className="hover:text-[#C04A2A] transition-colors cursor-pointer"
            >
              Resume
            </button>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-[#87909C] hover:text-[#181A1B] transition-colors cursor-pointer"
                >
                  [Lab Control]
                </button>
              </>
            )}
            <span>·</span>
            <button
              onClick={onScrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#181A1B] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 text-[#C04A2A]" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#87909C] gap-2">
          <p>© 2026 Chukwuemeka Victor. Technical Portfolio & Experiment Log.</p>
          <p className="font-mono">
            Structured in React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
