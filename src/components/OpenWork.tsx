import React from 'react';
import { OPEN_REPOSITORIES } from '../data/portfolioData';
import { ArrowUpRight, GitBranch, Terminal } from 'lucide-react';

export const OpenWork: React.FC = () => {
  const getLanguageDot = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python':
        return 'bg-[#3572A5]';
      case 'typescript':
        return 'bg-[#2563EB]';
      case 'javascript':
        return 'bg-[#F59E0B]';
      case 'jupyter notebook':
        return 'bg-[#EA580C]';
      default:
        return 'bg-[#10B981]';
    }
  };

  const getTechTagColor = (tIdx: number) => {
    const colors = [
      'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
      'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
      'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
      'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]',
      'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]',
    ];
    return colors[tIdx % colors.length];
  };

  return (
    <section id="open-work" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#1D4ED8] font-bold uppercase tracking-wider">SECTION 08</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              OPEN WORK
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Selected public code repositories, experiment notebooks, and application implementations.
          </p>
        </div>

        {/* Editorial Table-Style Layout */}
        <div className="bg-[#FFFFFF] border border-[#E5E1D8] border-t-4 border-t-[#2563EB] rounded-xs shadow-xs overflow-hidden">
          <div className="px-6 py-3 bg-[#F2EFE9] border-b border-[#E5E1D8] hidden md:grid grid-cols-12 font-mono text-[11px] text-[#87909C] uppercase tracking-wider">
            <span className="col-span-4">REPOSITORY</span>
            <span className="col-span-5">PURPOSE</span>
            <span className="col-span-2">LANGUAGE</span>
            <span className="col-span-1 text-right">ACTION</span>
          </div>

          <div className="divide-y divide-[#E5E1D8]">
            {OPEN_REPOSITORIES.map((repo, idx) => (
              <div
                key={idx}
                className="p-6 md:p-4 md:grid md:grid-cols-12 items-center gap-4 hover:bg-[#FBFBFA] transition-colors"
              >
                {/* Repo Name */}
                <div className="md:col-span-4 mb-2 md:mb-0">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span className="font-mono text-sm font-bold text-[#181A1B]">{repo.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#87909C] pl-5.5 block">
                    Updated: {repo.lastUpdated}
                  </span>
                </div>

                {/* Purpose */}
                <div className="md:col-span-5 mb-3 md:mb-0">
                  <p className="text-xs text-[#555C66] font-mono leading-relaxed">{repo.purpose}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {repo.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`font-mono text-[9px] px-1.5 py-0.5 border rounded-xs font-medium ${getTechTagColor(tIdx)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="md:col-span-2 font-mono text-xs text-[#181A1B] mb-3 md:mb-0">
                  <span className="md:hidden text-[10px] text-[#87909C] uppercase block mb-0.5">LANGUAGE:</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${getLanguageDot(repo.primaryLanguage)} shadow-2xs`} />
                    <span className="font-semibold">{repo.primaryLanguage}</span>
                  </span>
                </div>

                {/* Link */}
                <div className="md:col-span-1 md:text-right">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#181A1B] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors py-1 px-2.5 border border-[#E5E1D8] hover:border-[#BFDBFE] rounded-xs bg-[#FFFFFF]"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
