import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  Cpu,
  Database,
  BarChart3,
  Layers,
  Terminal,
  FileCode,
} from 'lucide-react';
import { CaseStudy } from '../types';
import { EXPERIMENTS } from '../data/portfolioData';

interface ExperimentCaseStudyProps {
  caseStudyId: string;
  onBack: () => void;
  onSelectCaseStudy: (id: string) => void;
}

export const ExperimentCaseStudy: React.FC<ExperimentCaseStudyProps> = ({
  caseStudyId,
  onBack,
  onSelectCaseStudy,
}) => {
  const currentExp = EXPERIMENTS.find((e) => e.id === caseStudyId) || EXPERIMENTS[0];
  const currentIndex = EXPERIMENTS.findIndex((e) => e.id === currentExp.id);
  const prevExp = currentIndex > 0 ? EXPERIMENTS[currentIndex - 1] : null;
  const nextExp = currentIndex < EXPERIMENTS.length - 1 ? EXPERIMENTS[currentIndex + 1] : null;

  // State for interactive features in PathoSense (e.g. Grad-CAM visualizer toggle, epoch selection)
  const [selectedEpoch, setSelectedEpoch] = useState<number>(9);
  const [gradCamActive, setGradCamActive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'study' | 'code'>('study');

  return (
    <article id="dedicated-case-study-page" className="min-h-screen bg-[#F8F7F4] text-[#181A1B] pb-24">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#E5E1D8] py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            id="case-study-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#555C66] hover:text-[#C04A2A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO EXPERIMENT LOG</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#87909C]">
              {currentExp.number} / EXP-0{EXPERIMENTS.length}
            </span>
            <div className="flex items-center border border-[#E5E1D8] rounded-xs bg-[#FFFFFF] overflow-hidden">
              <button
                id="btn-prev-case-study"
                disabled={!prevExp}
                onClick={() => prevExp && onSelectCaseStudy(prevExp.id)}
                className="p-1.5 text-[#555C66] hover:text-[#181A1B] hover:bg-[#F2EFE9] disabled:opacity-30 disabled:cursor-not-allowed"
                title={prevExp ? `Previous: ${prevExp.title}` : undefined}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-next-case-study"
                disabled={!nextExp}
                onClick={() => nextExp && onSelectCaseStudy(nextExp.id)}
                className="p-1.5 text-[#555C66] hover:text-[#181A1B] hover:bg-[#F2EFE9] disabled:opacity-30 disabled:cursor-not-allowed"
                title={nextExp ? `Next: ${nextExp.title}` : undefined}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Header Banner */}
      <header className="border-b border-[#E5E1D8] bg-[#FFFFFF] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#C04A2A] bg-[#F9EFEB] px-2.5 py-1 border border-[#C04A2A]/20 rounded-xs">
              {currentExp.number}
            </span>
            <span className="font-mono text-xs text-[#87909C] uppercase tracking-wider">
              OFFICIAL TECHNICAL CASE STUDY
            </span>
            <span className="text-[#D1CBC0]">·</span>
            <span className="font-mono text-xs text-[#555C66]">{currentExp.discipline}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#181A1B] tracking-tight mb-4">
            {currentExp.title}
          </h1>

          <p className="font-mono text-base text-[#555C66] max-w-3xl leading-relaxed mb-6">
            {currentExp.subtitle}
          </p>

          {/* Quick Technical Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E5E1D8] font-mono text-xs">
            <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
              <span className="text-[10px] text-[#87909C] uppercase block mb-0.5">STATUS</span>
              <span className="font-semibold text-[#181A1B]">{currentExp.status}</span>
            </div>

            <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
              <span className="text-[10px] text-[#87909C] uppercase block mb-0.5">DATA SOURCE</span>
              <span className="font-semibold text-[#181A1B] truncate block">{currentExp.data.name}</span>
            </div>

            <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
              <span className="text-[10px] text-[#87909C] uppercase block mb-0.5">PRIMARY MODEL</span>
              <span className="font-semibold text-[#181A1B] truncate block">
                {currentExp.approach.architecture.split(' ')[0]}
              </span>
            </div>

            <div className="p-2.5 bg-[#F9EFEB] border border-[#C04A2A]/20 rounded-xs">
              <span className="text-[10px] text-[#C04A2A] uppercase block mb-0.5 font-bold">VERIFIED RESULT</span>
              <span className="font-bold text-[#C04A2A] truncate block">{currentExp.result.headlineMetric}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Case Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 space-y-16">
        {/* ============================================================
            SECTION 1: THE QUESTION
           ============================================================ */}
        <section id="case-the-question" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">01</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              THE QUESTION
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs shadow-xs">
            <p className="font-serif text-xl sm:text-2xl text-[#181A1B] leading-relaxed italic">
              "{currentExp.question}"
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: THE DATA
           ============================================================ */}
        <section id="case-the-data" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">02</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              THE DATA
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-4 shadow-xs">
            <div>
              <h3 className="font-mono text-sm font-bold text-[#181A1B] mb-1">{currentExp.data.name}</h3>
              <p className="text-sm text-[#555C66] leading-relaxed">{currentExp.data.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 font-mono text-xs">
              {currentExp.data.specs.map((spec, i) => (
                <div key={i} className="p-3 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                  <span className="text-[10px] uppercase text-[#87909C] block mb-0.5">{spec.label}</span>
                  <span className="font-medium text-[#181A1B]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: THE APPROACH
           ============================================================ */}
        <section id="case-the-approach" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">03</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              THE APPROACH & PREPROCESSING
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-4 shadow-xs">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#87909C] block mb-1">
                  ARCHITECTURE & SYSTEM STRATEGY
                </span>
                <p className="font-mono text-sm font-bold text-[#181A1B]">{currentExp.approach.architecture}</p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] uppercase text-[#87909C] block">
                  DATA TRANSFORMS & PREPROCESSING STEPS:
                </span>
                <ul className="space-y-2 font-mono text-xs text-[#555C66]">
                  {currentExp.approach.preprocessing.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C04A2A] font-bold">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#F2EFE9] border border-[#E5E1D8] p-6 rounded-xs space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#87909C] block font-bold">
                ENGINEERING RATIONALE
              </span>
              <p className="text-xs text-[#555C66] leading-relaxed">{currentExp.approach.rationale}</p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: THE EXPERIMENT (WITH INTERACTIVE CHARTS / VISUALIZERS)
           ============================================================ */}
        <section id="case-the-experiment" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">04</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              THE EXPERIMENT
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-6 shadow-xs">
            <p className="text-sm text-[#555C66] leading-relaxed">{currentExp.experiment.details}</p>

            {/* Hyperparameters Grid */}
            <div>
              <span className="font-mono text-[10px] uppercase text-[#87909C] block mb-2 font-semibold">
                LOGGED HYPERPARAMETERS & CONFIGURATION:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
                {currentExp.experiment.hyperparameters.map((hp, i) => (
                  <div key={i} className="p-3 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                    <span className="text-[10px] text-[#87909C] block mb-0.5">{hp.label}</span>
                    <span className="font-bold text-[#181A1B]">{hp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Model Behavior: Epoch Progression for PathoSense */}
            {currentExp.experiment.epochsData && (
              <div className="pt-4 border-t border-[#E5E1D8] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#181A1B] uppercase tracking-wider">
                      TRAINING & VALIDATION LOSS CONVERGENCE (EPOCHS 1 - 9)
                    </span>
                    <p className="font-mono text-[11px] text-[#555C66]">
                      Hover or click an epoch to inspect validation accuracy and loss values.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C04A2A] font-bold">
                    PEAK: 93.78% (EPOCH 9)
                  </span>
                </div>

                {/* Clean, Non-Gimmicky Visual Curve Representation */}
                <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                  <div className="grid grid-cols-9 gap-1 sm:gap-2 items-end h-40 pt-4 pb-2">
                    {currentExp.experiment.epochsData.map((d) => {
                      const isSelected = selectedEpoch === d.epoch;
                      // Height normalized to max 100%
                      const heightPercent = Math.round((d.valAccuracy / 100) * 100);
                      return (
                        <button
                          key={d.epoch}
                          id={`epoch-bar-${d.epoch}`}
                          onClick={() => setSelectedEpoch(d.epoch)}
                          className="flex flex-col items-center justify-end h-full group cursor-pointer"
                        >
                          <span
                            className={`font-mono text-[9px] mb-1 transition-colors ${
                              isSelected ? 'text-[#C04A2A] font-bold' : 'text-[#87909C]'
                            }`}
                          >
                            {d.valAccuracy}%
                          </span>

                          <div className="w-full bg-[#E5E1D8] rounded-xs overflow-hidden h-28 flex items-end">
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className={`w-full transition-all duration-200 ${
                                isSelected
                                  ? 'bg-[#C04A2A]'
                                  : d.epoch === 9
                                  ? 'bg-[#181A1B]'
                                  : 'bg-[#87909C] group-hover:bg-[#555C66]'
                              }`}
                            />
                          </div>

                          <span
                            className={`font-mono text-[10px] mt-1.5 ${
                              isSelected ? 'font-bold text-[#C04A2A]' : 'text-[#555C66]'
                            }`}
                          >
                            E{d.epoch}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Epoch Inspector */}
                  {(() => {
                    const activeEpochData =
                      currentExp.experiment.epochsData.find((d) => d.epoch === selectedEpoch) ||
                      currentExp.experiment.epochsData[currentExp.experiment.epochsData.length - 1];
                    return (
                      <div className="mt-3 pt-3 border-t border-[#E5E1D8] flex flex-wrap items-center justify-between font-mono text-xs gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-xs bg-[#C04A2A]" />
                          <span className="font-bold text-[#181A1B]">INSPECTING EPOCH 0{activeEpochData.epoch}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#555C66]">
                          <span>
                            Train Loss: <strong className="text-[#181A1B]">{activeEpochData.trainLoss}</strong>
                          </span>
                          <span>
                            Val Loss: <strong className="text-[#181A1B]">{activeEpochData.valLoss}</strong>
                          </span>
                          <span>
                            Val Accuracy:{' '}
                            <strong className="text-[#C04A2A] font-bold">{activeEpochData.valAccuracy}%</strong>
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Grad-CAM Explainability Section for PathoSense */}
            {currentExp.gradCamInfo && (
              <div className="pt-6 border-t border-[#E5E1D8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#C04A2A]" />
                    <span className="font-mono text-xs font-bold text-[#181A1B] uppercase tracking-wider">
                      MODEL EXPLAINABILITY: GRAD-CAM ATTENTION MAPS
                    </span>
                  </div>
                  <button
                    id="toggle-gradcam-btn"
                    onClick={() => setGradCamActive(!gradCamActive)}
                    className="font-mono text-[11px] text-[#C04A2A] hover:underline cursor-pointer"
                  >
                    {gradCamActive ? 'SHOW RAW TISSUE VIEW' : 'SHOW GRAD-CAM HEATMAP OVERLAY'}
                  </button>
                </div>

                <p className="text-xs text-[#555C66] leading-relaxed">{currentExp.gradCamInfo.description}</p>

                {/* Visualizer Frame */}
                <div className="p-4 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-1 flex flex-col items-center justify-center p-3 bg-white border border-[#E5E1D8] rounded-xs">
                    <div className="relative w-32 h-32 rounded-xs overflow-hidden border border-[#D1CBC0] flex items-center justify-center bg-[#E5E1D8]">
                      {/* Stylized Histological Patch & Grad-CAM Heatmap overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E2B2C2] via-[#C98AA2] to-[#8C4368] opacity-90" />
                      {/* Simulating cellular nuclei dots */}
                      <div className="absolute inset-0 lab-dots opacity-70" />
                      {gradCamActive && (
                        <div className="absolute inset-0 bg-radial from-[#C04A2A]/80 via-[#F39C12]/40 to-transparent mix-blend-multiply" />
                      )}
                      <div className="absolute bottom-1 left-1 bg-[#181A1B]/80 text-[9px] font-mono text-white px-1 rounded-xs">
                        {gradCamActive ? 'GRAD-CAM ACTIVE' : 'RAW HISTOLOGY'}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#87909C] mt-2">
                      Pathology Patch: 28×28 px
                    </span>
                  </div>

                  <div className="md:col-span-2 space-y-2 font-mono text-xs">
                    <span className="text-[10px] uppercase text-[#87909C] font-semibold block">
                      KEY SALIENT REGIONS IDENTIFIED BY GRADIENT ACCUMULATION:
                    </span>
                    <ul className="space-y-1.5 text-[#555C66]">
                      {currentExp.gradCamInfo.focusAreas.map((area, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C04A2A] shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-[#87909C] pt-1">
                      Verification conclusion: the CNN focuses on biological nuclear clusters rather than border illumination variations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            SECTION 5: THE EVALUATION
           ============================================================ */}
        <section id="case-the-evaluation" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">05</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              THE EVALUATION
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-4 shadow-xs">
            <p className="text-sm text-[#555C66] leading-relaxed">{currentExp.evaluation.summary}</p>

            {/* Disclaimer if present (e.g. Heart Disease) */}
            {currentExp.evaluation.disclaimer && (
              <div className="p-3 bg-[#F9EFEB] border-l-2 border-[#C04A2A] rounded-xs flex items-start gap-2 text-xs font-mono">
                <AlertTriangle className="w-4 h-4 text-[#C04A2A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#C04A2A] uppercase text-[10px] block">CRITICAL BOUNDARY:</span>
                  <p className="text-[#181A1B]">{currentExp.evaluation.disclaimer}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
              {currentExp.evaluation.metrics.map((metric, i) => (
                <div
                  key={i}
                  className={`p-4 border rounded-xs ${
                    metric.highlight
                      ? 'bg-[#F9EFEB] border-[#C04A2A]/30 text-[#C04A2A]'
                      : 'bg-[#F8F7F4] border-[#E5E1D8] text-[#181A1B]'
                  }`}
                >
                  <span className="text-[10px] uppercase text-[#87909C] block mb-1">{metric.label}</span>
                  <span className="text-2xl font-bold block">{metric.value}</span>
                  {metric.note && <span className="text-[10px] text-[#555C66] mt-1 block">{metric.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: THE RESULT & DEPLOYMENT
           ============================================================ */}
        <section id="case-the-result" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">06</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              THE RESULT & DEPLOYMENT
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#E5E1D8]">
              <span className="font-serif text-xl sm:text-2xl font-medium text-[#181A1B]">
                Measured Outcome: {currentExp.result.headlineMetric}
              </span>
            </div>

            <p className="text-sm text-[#555C66] leading-relaxed">{currentExp.result.summary}</p>

            <div className="p-4 bg-[#F2EFE9] border border-[#E5E1D8] rounded-xs font-mono text-xs">
              <span className="text-[10px] uppercase text-[#87909C] font-semibold block mb-1">
                OPERATIONAL DEPLOYMENT FORMAT:
              </span>
              <p className="text-[#181A1B]">{currentExp.result.deployment}</p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: WHAT BROKE (CHALLENGES & LIMITATIONS)
           ============================================================ */}
        <section id="case-what-broke" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">07</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              WHAT BROKE (CHALLENGES & FAILED ATTEMPTS)
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-6 shadow-xs">
            <p className="text-xs font-mono text-[#87909C]">
              Scientific documentation requires recording failures, errors, and current limitations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[#C04A2A] font-semibold text-[11px]">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>INITIAL HURDLES</span>
                </div>
                <ul className="space-y-2 text-[#555C66]">
                  {currentExp.whatBroke.challenges.map((c, i) => (
                    <li key={i} className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[#C04A2A] font-semibold text-[11px]">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>FAILED ATTEMPTS</span>
                </div>
                <ul className="space-y-2 text-[#555C66]">
                  {currentExp.whatBroke.failedAttempts.map((f, i) => (
                    <li key={i} className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[#181A1B] font-semibold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#87909C]" />
                  <span>CURRENT LIMITATIONS</span>
                </div>
                <ul className="space-y-2 text-[#555C66]">
                  {currentExp.whatBroke.currentLimitations.map((l, i) => (
                    <li key={i} className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 8: WHAT I LEARNED
           ============================================================ */}
        <section id="case-what-i-learned" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]">
            <span className="font-mono text-xs text-[#C04A2A] font-bold">08</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#181A1B]">
              WHAT I LEARNED
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs space-y-3 shadow-xs">
            {currentExp.whatILearned.map((lesson, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F8F7F4] border-l-2 border-[#C04A2A] border border-[#E5E1D8] rounded-xs font-mono text-xs text-[#181A1B] leading-relaxed"
              >
                <span className="text-[#C04A2A] font-bold mr-2">TAKEAWAY 0{idx + 1}:</span>
                {lesson}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation Strip */}
        <div className="pt-8 border-t border-[#E5E1D8] flex flex-wrap items-center justify-between gap-4">
          <button
            id="bottom-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#181A1B] text-[#F8F7F4] text-xs font-mono tracking-wider hover:bg-[#C04A2A] transition-colors rounded-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO MAIN EXPERIMENT LOG</span>
          </button>

          <div className="flex items-center gap-2">
            {prevExp && (
              <button
                id="bottom-prev-btn"
                onClick={() => onSelectCaseStudy(prevExp.id)}
                className="px-3 py-1.5 text-xs font-mono border border-[#E5E1D8] bg-[#FFFFFF] hover:bg-[#F2EFE9] rounded-xs cursor-pointer"
              >
                ← {prevExp.title}
              </button>
            )}
            {nextExp && (
              <button
                id="bottom-next-btn"
                onClick={() => onSelectCaseStudy(nextExp.id)}
                className="px-3 py-1.5 text-xs font-mono border border-[#E5E1D8] bg-[#FFFFFF] hover:bg-[#F2EFE9] rounded-xs cursor-pointer"
              >
                {nextExp.title} →
              </button>
            )}
          </div>
        </div>
      </main>
    </article>
  );
};
