import React from 'react';
import { CURRENTLY_EXPLORING } from '../data/portfolioData';
import { BookOpen, Sparkles, Clock, Bookmark } from 'lucide-react';

export const LearningLog: React.FC = () => {
  return (
    <section id="learning" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#C04A2A] rounded-full" />
              <span className="font-mono text-xs text-[#87909C] uppercase tracking-wider">SECTION 07</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              CURRENTLY EXPLORING
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Active reading notes, ongoing experiments, and technical areas under study. No fabricated credentials.
          </p>
        </div>

        {/* Live Learning Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRENTLY_EXPLORING.map((item, idx) => {
            const domainThemes = [
              { topBorder: 'border-t-[#E11D48]', badge: 'text-[#9F1239] bg-[#FFE4E6] border-[#FDA4AF]', dot: 'bg-[#E11D48]', focusBox: 'bg-[#FFF1F2] border-[#FECDD3] text-[#881337]' },
              { topBorder: 'border-t-[#0D9488]', badge: 'text-[#0F766E] bg-[#CCFBF1] border-[#5EEAD4]', dot: 'bg-[#0D9488]', focusBox: 'bg-[#F0FDFA] border-[#CCFBF1] text-[#134E4A]' },
              { topBorder: 'border-t-[#4F46E5]', badge: 'text-[#3730A3] bg-[#EEF2FF] border-[#C7D2FE]', dot: 'bg-[#4F46E5]', focusBox: 'bg-[#EEF2FF] border-[#C7D2FE] text-[#312E81]' },
              { topBorder: 'border-t-[#D97706]', badge: 'text-[#92400E] bg-[#FEF3C7] border-[#FCD34D]', dot: 'bg-[#D97706]', focusBox: 'bg-[#FFFBEB] border-[#FDE68A] text-[#78350F]' },
              { topBorder: 'border-t-[#059669]', badge: 'text-[#065F46] bg-[#D1FAE5] border-[#6EE7B7]', dot: 'bg-[#059669]', focusBox: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#064E3B]' },
              { topBorder: 'border-t-[#7C3AED]', badge: 'text-[#5B21B6] bg-[#EDE9FE] border-[#C4B5FD]', dot: 'bg-[#7C3AED]', focusBox: 'bg-[#F5F3FF] border-[#DDD6FE] text-[#4C1D95]' },
            ];
            const theme = domainThemes[idx % domainThemes.length];

            return (
              <div
                key={idx}
                className={`bg-[#FFFFFF] border border-[#E5E1D8] border-t-4 ${theme.topBorder} p-6 rounded-xs hover:shadow-sm transition-all flex flex-col justify-between shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5E1D8]">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                      <span className={`font-mono text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-xs border ${theme.badge}`}>
                        {item.domain}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#555C66] font-semibold bg-[#F8F7F4] px-1.5 py-0.5 rounded-xs border border-[#E5E1D8]">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#181A1B] mb-2">
                    {item.topic}
                  </h3>

                  <p className="text-xs text-[#555C66] font-mono leading-relaxed mb-4">
                    {item.focusArea}
                  </p>
                </div>

                <div className={`p-3 border rounded-xs font-mono text-[11px] ${theme.focusBox}`}>
                  <span className="text-[9px] uppercase tracking-wider block mb-1 font-bold opacity-80">
                    CURRENT FOCUS & LOG:
                  </span>
                  <p className="leading-relaxed opacity-95">{item.notes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
