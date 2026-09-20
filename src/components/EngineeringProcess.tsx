import React, { useState } from 'react';
import { EXPERIMENT_PROTOCOL } from '../data/portfolioData';
import { CheckCircle2, ChevronRight, FileSpreadsheet, Copy, Check, Terminal } from 'lucide-react';

export const EngineeringProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
        })
        .catch(() => fallbackCopy(text, id));
    } else {
      fallbackCopy(text, id);
    }
  };

  const fallbackCopy = (text: string, id: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const stageThemes = [
    { bg: 'bg-[#F0FDFA]', text: 'text-[#0F766E]', border: 'border-[#5EEAD4]', bar: 'border-l-[#0D9488]' },
    { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', border: 'border-[#FCD34D]', bar: 'border-l-[#D97706]' },
    { bg: 'bg-[#EEF2FF]', text: 'text-[#3730A3]', border: 'border-[#A5B4FC]', bar: 'border-l-[#4F46E5]' },
    { bg: 'bg-[#F5F3FF]', text: 'text-[#5B21B6]', border: 'border-[#C4B5FD]', bar: 'border-l-[#7C3AED]' },
    { bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]', border: 'border-[#6EE7B7]', bar: 'border-l-[#059669]' },
    { bg: 'bg-[#FFF1F2]', text: 'text-[#9F1239]', border: 'border-[#FDA4AF]', bar: 'border-l-[#E11D48]' },
    { bg: 'bg-[#EFF6FF]', text: 'text-[#1E40AF]', border: 'border-[#93C5FD]', bar: 'border-l-[#2563EB]' },
    { bg: 'bg-[#F0FDFA]', text: 'text-[#0F766E]', border: 'border-[#5EEAD4]', bar: 'border-l-[#0D9488]' },
  ];

  const currentTheme = stageThemes[activeStep % stageThemes.length];
  const currentStep = EXPERIMENT_PROTOCOL[activeStep];
  const isCopied = copiedId === `process-${currentStep.stepNumber}`;

  return (
    <section id="process" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#6D28D9] font-bold uppercase tracking-wider">SECTION 05</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              HOW I RUN AN EXPERIMENT
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Standard operating procedure: structured like a laboratory protocol rather than a speculative workflow.
          </p>
        </div>

        {/* Laboratory Protocol Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Protocol Index (Step Buttons) */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs divide-y divide-[#E5E1D8] shadow-xs">
            <div className="p-3.5 bg-gradient-to-r from-[#F5F3FF] via-[#F8F7F4] to-[#FFFFFF] border-b border-[#E5E1D8] flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#5B21B6] tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                PROTOCOL STAGES [SOP-ML-01]
              </span>
              <span className="font-mono text-[10px] text-[#6D28D9] bg-[#EDE9FE] px-2 py-0.5 rounded-xs border border-[#DDD6FE] font-bold">
                8 STAGES
              </span>
            </div>

            {EXPERIMENT_PROTOCOL.map((step, idx) => {
              const isSelected = activeStep === idx;
              const stepTheme = stageThemes[idx % stageThemes.length];
              return (
                <button
                  key={step.stepNumber}
                  id={`process-step-btn-${step.stepNumber}`}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-3 font-mono text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? `${stepTheme.bg} ${stepTheme.text} font-bold border-l-4 ${stepTheme.bar}`
                      : 'text-[#555C66] hover:bg-[#F8F7F4] hover:text-[#181A1B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold ${isSelected ? stepTheme.text : 'text-[#87909C]'}`}>
                      {step.stepNumber}
                    </span>
                    <span className="tracking-wider">{step.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? `${stepTheme.text} translate-x-0.5` : 'text-[#D1CBC0]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Step Protocol Card (Engineering Bench Inspection) */}
          <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E5E1D8] border-t-4 border-t-[#7C3AED] p-6 lg:p-8 rounded-xs shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-bold px-2.5 py-0.5 border rounded-xs ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}>
                  STAGE {currentStep.stepNumber}
                </span>
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
                  {currentStep.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#87909C] bg-[#F8F7F4] px-2 py-0.5 rounded-xs border border-[#E5E1D8]">
                STANDARD OPERATING PROCEDURE
              </span>
            </div>

            {/* Action Statement */}
            <div>
              <span className="font-mono text-[10px] uppercase text-[#87909C] font-semibold block mb-1">OBJECTIVE & ACTION</span>
              <p className="font-serif text-lg text-[#181A1B] leading-relaxed">
                {currentStep.action}
              </p>
            </div>

            {/* Protocol Checklist */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[10px] uppercase text-[#87909C] font-semibold block">
                MANDATORY CHECKLIST / VERIFICATION GATES:
              </span>
              <div className="space-y-2">
                {currentStep.checklist.map((item, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 bg-[#F8F7F4] hover:bg-[#F0FDF4] border border-[#E5E1D8] hover:border-[#A7F3D0] rounded-xs flex items-start gap-2.5 font-mono text-xs text-[#181A1B] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Configuration Snippet (Executable Protocol Recipe) */}
            {currentStep.configSnippet && (
              <div className="border border-[#33373B] rounded-xs overflow-hidden bg-[#181A1B] text-[#F8F7F4] shadow-sm">
                <div className="px-4 py-2.5 bg-[#232628] border-b border-[#33373B] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span className="font-mono text-xs text-[#BAE6FD] font-medium">
                      {currentStep.snippetLabel || 'STAGE CONFIGURATION & RECIPE'}
                    </span>
                  </div>

                  <button
                    id={`btn-copy-process-snippet-${currentStep.stepNumber}`}
                    onClick={() => handleCopy(currentStep.configSnippet!, `process-${currentStep.stepNumber}`)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] rounded-xs transition-colors cursor-pointer ${
                      isCopied
                        ? 'bg-[#059669] text-white font-bold shadow-xs'
                        : 'bg-[#2E3235] text-[#F8F7F4] hover:bg-[#3E4348] border border-[#44494E]'
                    }`}
                    title="Copy configuration snippet to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto selection:bg-[#38BDF8] selection:text-[#0F172A]">
                  <pre className="text-[#E2E8F0] font-mono whitespace-pre">{currentStep.configSnippet}</pre>
                </div>
              </div>
            )}

            {/* Output Artifact */}
            <div className="p-4 bg-gradient-to-r from-[#F0FDF4] via-[#F8F7F4] to-[#FFFFFF] border border-[#A7F3D0] rounded-xs flex items-start justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase text-[#065F46] font-bold block mb-0.5">
                  REQUIRED LOGGED ARTIFACT
                </span>
                <p className="text-[#047857] font-bold">{currentStep.outputArtifact}</p>
              </div>
              <FileSpreadsheet className="w-5 h-5 text-[#059669] shrink-0" />
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E1D8]">
              <button
                id="process-prev-step"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-3 py-1.5 text-xs font-mono border border-[#E5E1D8] rounded-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F2EFE9] cursor-pointer"
              >
                ← Previous Stage
              </button>

              <span className="font-mono text-xs text-[#87909C]">
                {activeStep + 1} of {EXPERIMENT_PROTOCOL.length}
              </span>

              <button
                id="process-next-step"
                disabled={activeStep === EXPERIMENT_PROTOCOL.length - 1}
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-3 py-1.5 text-xs font-mono border border-[#E5E1D8] rounded-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F2EFE9] cursor-pointer"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
