import React from 'react';
import { Microscope, GitCommit, CheckSquare, ShieldCheck, Scale, ArrowRight } from 'lucide-react';

export const LabSection: React.FC = () => {
  const laboratoryPrinciples = [
    {
      title: 'Observation & Measurement',
      labContext: 'Standardized specimen calibration, biological variability, and signal detection thresholding.',
      mlTranslation:
        'Auditing dataset distributions, spotting class imbalance, and understanding feature bounds before training.',
      icon: Microscope,
      accent: '#0D9488',
      topBorder: 'border-t-[#0D9488]',
      iconBg: 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]',
      badge: 'text-[#0F766E] bg-[#CCFBF1] border-[#5EEAD4]',
      mlLabel: 'text-[#0D9488]',
    },
    {
      title: 'Structured Processes',
      labContext: 'Adhering to strict Standard Operating Procedures (SOPs) to guarantee clinical reliability.',
      mlTranslation:
        'Reproducible preprocessing pipelines, seed fixation, and automated transform isolation.',
      icon: CheckSquare,
      accent: '#D97706',
      topBorder: 'border-t-[#D97706]',
      iconBg: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]',
      badge: 'text-[#92400E] bg-[#FEF3C7] border-[#FCD34D]',
      mlLabel: 'text-[#D97706]',
    },
    {
      title: 'Evidence & Validation',
      labContext: 'Internal quality control sera and external proficiency testing before releasing clinical results.',
      mlTranslation:
        'Evaluating with stratified folds, confusion matrices, and F1 scores rather than superficial accuracy.',
      icon: Scale,
      accent: '#059669',
      topBorder: 'border-t-[#059669]',
      iconBg: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]',
      badge: 'text-[#065F46] bg-[#D1FAE5] border-[#6EE7B7]',
      mlLabel: 'text-[#059669]',
    },
    {
      title: 'Reproducibility & Anti-Contamination',
      labContext: 'Aseptic protocols to prevent reagent cross-contamination across test tubes.',
      mlTranslation:
        'Enforcing strict data partitions so training distributions never leak into test evaluations.',
      icon: ShieldCheck,
      accent: '#4F46E5',
      topBorder: 'border-t-[#4F46E5]',
      iconBg: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
      badge: 'text-[#3730A3] bg-[#E0E7FF] border-[#A5B4FC]',
      mlLabel: 'text-[#4F46E5]',
    },
  ];

  return (
    <section id="lab" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#0F766E] font-bold uppercase tracking-wider">SECTION 02</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              THE LAB
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            The intersection of biological laboratory discipline and computational engineering.
          </p>
        </div>

        {/* Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-6 space-y-4 text-base text-[#555C66] leading-relaxed">
            <p className="font-serif text-xl sm:text-2xl text-[#181A1B] leading-snug">
              "My background sits between laboratory science and software engineering."
            </p>

            <p>
              Studying Medical Laboratory Science taught me to respect biological complexity. When you run an automated
              analyzer, examine blood films under a microscope, or culture bacterial colonies, you learn early on that
              noise is real, instruments drift, and shortcuts invalidate conclusions.
            </p>

            <p>
              This does not mean that clinical lab training magically turns someone into a senior machine learning
              expert. Rather, it shapes how I approach machine learning: not as magical black-box prompting, but as an
              empirical engineering discipline governed by rigorous experimental protocols.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E1D8]">
              <span className="font-mono text-xs font-bold uppercase text-[#181A1B] tracking-wider">
                CORE PHILOSOPHY: EXPERIMENTATION OVER SPECULATION
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-[#555C66] leading-normal">
              <div className="p-3.5 bg-[#F0FDFA] border-l-4 border-l-[#0D9488] border border-[#CCFBF1] rounded-r-xs">
                <p className="font-bold text-[#0F766E] mb-1">Observation & Measurement First</p>
                <p className="text-[#334155]">Never assume what features represent without inspecting distributions, null counts, and variances.</p>
              </div>

              <div className="p-3.5 bg-[#EEF2FF] border-l-4 border-l-[#4F46E5] border border-[#C7D2FE] rounded-r-xs">
                <p className="font-bold text-[#3730A3] mb-1">Zero Tolerance for Contamination</p>
                <p className="text-[#334155]">Fit every scaler, encoder, and imputer strictly inside the training fold. Data leakage is algorithmic contamination.</p>
              </div>

              <div className="p-3.5 bg-[#ECFDF5] border-l-4 border-l-[#059669] border border-[#A7F3D0] rounded-r-xs">
                <p className="font-bold text-[#065F46] mb-1">Evidence-Based Metrics</p>
                <p className="text-[#334155]">High accuracy is meaningless if false negatives destroy utility. Evaluation must reflect the real-world operational cost of errors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Laboratory Principles Translated to ML */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {laboratoryPrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`bg-[#FFFFFF] border border-[#E5E1D8] border-t-4 ${item.topBorder} p-5 rounded-xs hover:shadow-sm transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xs border flex items-center justify-center ${item.iconBg}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-xs border font-semibold ${item.badge}`}>
                      PRIN-0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#181A1B] mb-3">
                    {item.title}
                  </h3>

                  <div className="space-y-2.5 text-[11px] leading-relaxed">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#87909C] block mb-0.5">
                        IN CLINICAL LAB:
                      </span>
                      <p className="text-[#555C66]">{item.labContext}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E5E1D8]">
                      <span className={`font-mono text-[9px] uppercase tracking-wider block mb-0.5 font-bold ${item.mlLabel}`}>
                        IN APPLIED ML:
                      </span>
                      <p className="text-[#181A1B] font-medium">{item.mlTranslation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
