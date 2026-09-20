import React, { useState } from 'react';
import { WHAT_FAILED_LESSONS } from '../data/portfolioData';
import { AlertCircle, CheckCircle2, ArrowDownRight, Terminal } from 'lucide-react';

export const WhatFailed: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'PREPROCESSING', 'DATA LEAKAGE', 'MODEL OVERFITTING', 'DEPLOYMENT & STREAMING', 'EVALUATION METRICS', 'ENVIRONMENT & DEPENDENCY'];

  const filteredLessons = selectedFilter === 'ALL'
    ? WHAT_FAILED_LESSONS
    : WHAT_FAILED_LESSONS.filter(l => l.category === selectedFilter);

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'DATA LEAKAGE':
        return 'text-[#BE123C] bg-[#FFE4E6] border-[#FDA4AF]';
      case 'MODEL OVERFITTING':
        return 'text-[#B45309] bg-[#FEF3C7] border-[#FCD34D]';
      case 'DEPLOYMENT & STREAMING':
        return 'text-[#6D28D9] bg-[#EDE9FE] border-[#C4B5FD]';
      case 'EVALUATION METRICS':
        return 'text-[#047857] bg-[#D1FAE5] border-[#6EE7B7]';
      case 'PREPROCESSING':
        return 'text-[#1D4ED8] bg-[#DBEAFE] border-[#93C5FD]';
      case 'ENVIRONMENT & DEPENDENCY':
        return 'text-[#0F766E] bg-[#CCFBF1] border-[#5EEAD4]';
      default:
        return 'text-[#9F1239] bg-[#FFE4E6] border-[#FDA4AF]';
    }
  };

  return (
    <section id="failures" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#E11D48] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#BE123C] font-bold uppercase tracking-wider">SECTION 06</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              THINGS I HAD TO FIGURE OUT
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Engineering post-mortems and actual obstacles encountered while taking machine learning from concept to code.
          </p>
        </div>

        {/* Narrative Box */}
        <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs mb-8 text-xs font-mono text-[#555C66] leading-relaxed shadow-xs">
          <p className="text-sm font-serif italic text-[#181A1B] mb-2">
            "Real engineering begins when the standard tutorial script silently fails."
          </p>
          <p>
            In laboratory medicine, when a control sample tests out of reference range, you don't adjust the gauge—you
            investigate the reagent lot, recalibrate the pipettes, and inspect the protocol. These logs document actual
            technical failures I hit across data leakage, scaling, overfitting, and deployment, and how they were
            diagnosed and resolved.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-mono text-[10px] uppercase text-[#87909C] mr-2 font-semibold">FILTER DISCIPLINE:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-xs border transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#181A1B] text-[#F8F7F4] border-[#181A1B] font-bold'
                  : 'bg-[#FFFFFF] text-[#555C66] border-[#E5E1D8] hover:border-[#D1CBC0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Failure Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs hover:shadow-sm transition-all space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5E1D8]">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${getCategoryTheme(lesson.category)}`}>
                    {lesson.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#87909C]">LOGGED POST-MORTEM</span>
                </div>

                <h3 className="font-serif text-lg font-medium text-[#181A1B] mb-3">
                  {lesson.issue}
                </h3>

                {/* Symptom */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#FFFBEB] border-l-4 border-l-[#F59E0B] border border-[#FDE68A] rounded-r-xs">
                    <span className="text-[10px] uppercase text-[#B45309] font-bold block mb-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#F59E0B]" />
                      SYMPTOM OBSERVED:
                    </span>
                    <p className="text-[#78350F] leading-relaxed">{lesson.symptom}</p>
                  </div>

                  {/* Root Cause */}
                  <div className="p-3 bg-[#FFF1F2] border-l-4 border-l-[#E11D48] border border-[#FECDD3] rounded-r-xs">
                    <span className="text-[10px] uppercase text-[#BE123C] font-bold block mb-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#E11D48]" />
                      ROOT CAUSE:
                    </span>
                    <p className="text-[#881337] leading-relaxed">{lesson.rootCause}</p>
                  </div>
                </div>
              </div>

              {/* Resolution */}
              <div className="pt-3 border-t border-[#E5E1D8] font-mono text-xs">
                <div className="p-3 bg-[#ECFDF5] border-l-4 border-l-[#059669] border border-[#A7F3D0] rounded-r-xs">
                  <span className="text-[10px] uppercase text-[#047857] font-bold block mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    ENGINEERING RESOLUTION:
                  </span>
                  <p className="text-[#064E3B] leading-relaxed">{lesson.resolution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
