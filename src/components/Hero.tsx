import React, { useState } from 'react';
import { ArrowDown, CheckCircle2, ChevronRight, Activity, Cpu, Sliders, Database, Layers } from 'lucide-react';

interface HeroProps {
  onExploreExperiments: () => void;
  onOpenCaseStudy: (id: string) => void;
}

interface PipelineStage {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  metricSample: string;
  accentColor: string;
  activeBg: string;
  activeBorder: string;
  iconActiveBg: string;
  iconPassiveBg: string;
  textActive: string;
  pillBg: string;
  pingColor: string;
  annotation: {
    project: string;
    details: { label: string; value: string }[];
    insight: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ onExploreExperiments, onOpenCaseStudy }) => {
  const [selectedStage, setSelectedStage] = useState<number>(2); // Default to TRAIN

  const pipelineStages: PipelineStage[] = [
    {
      id: 'data',
      name: 'DATA',
      shortCode: '01/IN',
      tagline: 'Dataset auditing & distribution inspection',
      icon: Database,
      metricSample: '100K+ histological patches · 14 clinical features',
      accentColor: '#2563EB',
      activeBg: 'bg-[#EFF6FF]',
      activeBorder: 'border-[#3B82F6]',
      iconActiveBg: 'bg-[#2563EB] text-white',
      iconPassiveBg: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
      textActive: 'text-[#1D4ED8]',
      pillBg: 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]',
      pingColor: 'bg-[#3B82F6]',
      annotation: {
        project: 'PathMNIST & UCI Heart Disease',
        details: [
          { label: 'Sources', value: 'MedMNIST v2 & UCI Repository' },
          { label: 'Modality', value: '28×28 Histology Patches & Clinical Records' },
          { label: 'Check', value: 'Demographic balance & missing value audit' },
        ],
        insight:
          'In laboratory science, contaminated samples invalidate tests. In ML, poor data audits lead to silent algorithmic failure.',
      },
    },
    {
      id: 'preprocess',
      name: 'PREPROCESS',
      shortCode: '02/TRANS',
      tagline: 'Strict train-split scaling & tensor normalization',
      icon: Sliders,
      metricSample: 'StandardScaler (Z-Score) · [0.5, 0.5, 0.5] Norm',
      accentColor: '#7C3AED',
      activeBg: 'bg-[#FAF5FF]',
      activeBorder: 'border-[#8B5CF6]',
      iconActiveBg: 'bg-[#7C3AED] text-white',
      iconPassiveBg: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
      textActive: 'text-[#6D28D9]',
      pillBg: 'bg-[#EDE9FE] text-[#5B21B6] border-[#C4B5FD]',
      pingColor: 'bg-[#8B5CF6]',
      annotation: {
        project: 'Data Leakage Defense Pipeline',
        details: [
          { label: 'Scaling', value: 'StandardScaler fitted strictly on train fold' },
          { label: 'Vision Norm', value: 'Mean=[0.5, 0.5, 0.5], Std=[0.5, 0.5, 0.5]' },
          { label: 'Tensors', value: 'PyTorch DataLoader with batch shuffle' },
        ],
        insight:
          'Distance metrics in KNN and gradient updates in CNNs are hypersensitive to unscaled variance and accidental data leakage.',
      },
    },
    {
      id: 'train',
      name: 'TRAIN',
      shortCode: '03/EXEC',
      tagline: 'Iterative optimization with convergence tracking',
      icon: Cpu,
      metricSample: 'Epochs: 9 · Optimizer: Adam · Loss: Cross-Entropy',
      accentColor: '#C04A2A',
      activeBg: 'bg-[#FFF7ED]',
      activeBorder: 'border-[#EA580C]',
      iconActiveBg: 'bg-[#C04A2A] text-white',
      iconPassiveBg: 'bg-[#FFF7ED] text-[#C04A2A] border-[#FED7AA]',
      textActive: 'text-[#C2410C]',
      pillBg: 'bg-[#FFEDD5] text-[#9A3412] border-[#FDBA74]',
      pingColor: 'bg-[#F97316]',
      annotation: {
        project: 'PathoSense CNN (PyTorch)',
        details: [
          { label: 'Epochs', value: '9 full convergence cycles' },
          { label: 'Optimizer', value: 'Adam (lr=0.001)' },
          { label: 'Loss Fn', value: 'Cross-Entropy Loss' },
          { label: 'Regularization', value: 'Batch Normalization + Dropout (0.25, 0.50)' },
        ],
        insight:
          'Verified training trajectory: prevented memorization on small 28×28 patches by pruning excess convolutional depth.',
      },
    },
    {
      id: 'evaluate',
      name: 'EVALUATE',
      shortCode: '04/TEST',
      tagline: 'Metric verification beyond simple accuracy',
      icon: Activity,
      metricSample: 'Val Acc: ~93.78% · F1: ~0.8305 · Grad-CAM XAI',
      accentColor: '#059669',
      activeBg: 'bg-[#ECFDF5]',
      activeBorder: 'border-[#10B981]',
      iconActiveBg: 'bg-[#059669] text-white',
      iconPassiveBg: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]',
      textActive: 'text-[#047857]',
      pillBg: 'bg-[#D1FAE5] text-[#065F46] border-[#6EE7B7]',
      pingColor: 'bg-[#10B981]',
      annotation: {
        project: 'PathoSense & Heart Disease ML',
        details: [
          { label: 'Vision Val Acc', value: '~93.78% (epoch 9)' },
          { label: 'Clinical F1', value: '~0.8305 (k=9, Manhattan distance)' },
          { label: 'Explainability', value: 'Grad-CAM feature activation maps' },
        ],
        insight:
          'F1 scores and visual attention heatmaps ensure the model isn’t making decisions based on class imbalance or background artifacts.',
      },
    },
    {
      id: 'deploy',
      name: 'DEPLOY',
      shortCode: '05/OUT',
      tagline: 'Packaging into usable, reproducible software',
      icon: Layers,
      metricSample: 'Streamlit Interface · Modular CLI · PyTorch Serving',
      accentColor: '#0891B2',
      activeBg: 'bg-[#F0FDFA]',
      activeBorder: 'border-[#14B8A6]',
      iconActiveBg: 'bg-[#0891B2] text-white',
      iconPassiveBg: 'bg-[#F0FDFA] text-[#0891B2] border-[#99F6E4]',
      textActive: 'text-[#0F766E]',
      pillBg: 'bg-[#CCFBF1] text-[#115E59] border-[#5EEAD4]',
      pingColor: 'bg-[#14B8A6]',
      annotation: {
        project: 'Operational Interfaces',
        details: [
          { label: 'Prototypes', value: 'Streamlit inference UI (<15ms CPU latency)' },
          { label: 'Pipelines', value: 'PyTorch Model Serving & Grad-CAM Telemetry' },
          { label: 'State', value: '@st.cache_resource model caching' },
        ],
        insight:
          'A model in a Jupyter notebook is an experiment; a deployed interface with error handling turns data into a decision.',
      },
    },
  ];

  const activeStage = pipelineStages[selectedStage];

  return (
    <section id="hero" className="relative pt-6 pb-16 sm:pb-24 border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Asymmetric Editorial Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Technical Eyebrow / Disciplinary Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#EFF6FF] via-[#F5F3FF] to-[#FFF7ED] border border-[#BFDBFE] rounded-xs mb-5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                <span className="font-mono text-[11px] font-semibold tracking-wider text-[#1E3A8A] uppercase">
                  AI/ML ENGINEER · SOFTWARE BUILDER · MEDICAL LABORATORY SCIENCE
                </span>
              </div>

              {/* Large Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#181A1B] tracking-tight mb-6">
                I build machine-learning systems from{' '}
                <span className="italic font-normal text-[#C04A2A] underline decoration-[#FCA5A5] underline-offset-4">
                  data
                </span>{' '}
                to{' '}
                <span className="italic font-normal text-[#2563EB] underline decoration-[#93C5FD] underline-offset-4">
                  decision
                </span>
                .
              </h1>

              {/* Supporting Copy */}
              <div className="space-y-3.5 max-w-2xl text-[#555C66] text-base sm:text-lg leading-relaxed mb-8">
                <p>
                  I'm <strong className="text-[#181A1B] font-semibold">Chukwuemeka Victor</strong> — an emerging AI/ML
                  engineer exploring practical machine learning, computer vision, and healthcare-focused technology.
                </p>
                <p className="text-[#555C66] text-sm sm:text-base">
                  I enjoy taking a dataset from preprocessing and experimentation through evaluation and into a usable
                  application.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 mb-10">
                <button
                  id="hero-explore-btn"
                  onClick={onExploreExperiments}
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-[#181A1B] text-[#F8F7F4] text-xs font-mono tracking-wider hover:bg-[#C04A2A] transition-colors rounded-xs shadow-sm cursor-pointer"
                >
                  <span>INSPECT EXPERIMENT LOG</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id="hero-open-pathosense-btn"
                  onClick={() => onOpenCaseStudy('pathosense')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFF1F2] border border-[#FECDD3] text-[#9F1239] text-xs font-mono tracking-wider hover:bg-[#FFE4E6] hover:border-[#FDA4AF] transition-colors rounded-xs cursor-pointer shadow-xs"
                >
                  <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-ping" />
                  <span>CASE STUDY: PATHOSENSE (~93.78%)</span>
                </button>
              </div>
            </div>

            {/* Micro-Details Metadata Grid: Engineering Notebook Style with vibrant color-coding */}
            <div
              id="hero-metadata-grid"
              className="pt-6 border-t border-[#E5E1D8] grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              <div className="border-l-4 border-l-[#10B981] bg-[#F0FDF4] p-2.5 rounded-r-xs border border-r-0 border-y-0 border-[#E5E1D8]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <p className="font-mono text-[10px] uppercase text-[#065F46] font-bold tracking-wider">LOCATION</p>
                </div>
                <p className="font-mono text-xs font-bold text-[#181A1B]">Nigeria</p>
              </div>

              <div className="border-l-4 border-l-[#3B82F6] bg-[#EFF6FF] p-2.5 rounded-r-xs border border-r-0 border-y-0 border-[#E5E1D8]">
                <p className="font-mono text-[10px] uppercase text-[#1E40AF] font-bold tracking-wider mb-0.5">FOCUS</p>
                <p className="font-mono text-xs font-bold text-[#181A1B]">ML · Computer Vision</p>
              </div>

              <div className="border-l-4 border-l-[#8B5CF6] bg-[#FAF5FF] p-2.5 rounded-r-xs border border-r-0 border-y-0 border-[#E5E1D8]">
                <p className="font-mono text-[10px] uppercase text-[#6B21A8] font-bold tracking-wider mb-0.5">LEARNING</p>
                <p className="font-mono text-xs font-bold text-[#181A1B]">Deep Learning · Serving</p>
              </div>

              <div className="border-l-4 border-l-[#F59E0B] bg-[#FFFBEB] p-2.5 rounded-r-xs border border-r-0 border-y-0 border-[#E5E1D8]">
                <p className="font-mono text-[10px] uppercase text-[#92400E] font-bold tracking-wider mb-0.5">BACKGROUND</p>
                <p className="font-mono text-xs font-bold text-[#181A1B]">Medical Lab Science</p>
              </div>
            </div>
          </div>

          {/* Right Column: Original Interactive "Model Pipeline Visualization" with rich color cues */}
          <div className="lg:col-span-5">
            <div
              id="model-pipeline-instrument"
              className="bg-[#FFFFFF] border border-[#E5E1D8] rounded-xs shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              {/* Instrument Header with color accents */}
              <div className="px-4 py-2.5 bg-gradient-to-r from-[#F8F7F4] to-[#F2EFE9] border-b border-[#E5E1D8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: activeStage.accentColor }} />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#181A1B]">
                    PIPELINE TELEMETRY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 border border-[#BFDBFE] rounded-xs font-semibold">
                  INTERACTIVE INSTRUMENT
                </span>
              </div>

              {/* Vertical Pipeline Stages */}
              <div className="p-4 space-y-1.5">
                <p className="font-mono text-[10px] text-[#87909C] uppercase tracking-wider mb-2">
                  SELECT A STAGE TO INSPECT TELEMETRY:
                </p>

                {pipelineStages.map((stage, index) => {
                  const isSelected = selectedStage === index;
                  const Icon = stage.icon;
                  return (
                    <div key={stage.id} className="relative">
                      <button
                        id={`pipeline-stage-${stage.id}`}
                        onClick={() => setSelectedStage(index)}
                        onMouseEnter={() => setSelectedStage(index)}
                        className={`w-full text-left p-3 rounded-xs border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? `${stage.activeBg} ${stage.activeBorder} shadow-xs`
                            : 'bg-[#FFFFFF] border-[#E5E1D8] hover:border-[#D1CBC0] hover:bg-[#F8F7F4]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-xs flex items-center justify-center font-mono text-xs border transition-colors ${
                              isSelected
                                ? `${stage.iconActiveBg} border-transparent shadow-xs`
                                : `${stage.iconPassiveBg}`
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-mono text-xs font-bold tracking-wider ${
                                  isSelected ? stage.textActive : 'text-[#181A1B]'
                                }`}
                              >
                                {stage.name}
                              </span>
                              <span className="font-mono text-[10px] text-[#87909C]">{stage.shortCode}</span>
                            </div>
                            <p className="text-[11px] text-[#555C66] font-mono truncate max-w-[200px] sm:max-w-xs">
                              {stage.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-xs border ${
                              isSelected ? stage.pillBg : 'text-[#555C66] bg-[#F2EFE9] border-[#E5E1D8]'
                            }`}
                          >
                            {stage.id === 'train' ? '9 Epochs' : stage.id === 'evaluate' ? '93.78% Acc' : 'Active'}
                          </span>
                          <span
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                              isSelected ? `${stage.pingColor} animate-pulse` : 'bg-[#D1CBC0]'
                            }`}
                          />
                        </div>
                      </button>

                      {index < pipelineStages.length - 1 && (
                        <div className="flex justify-center my-0.5">
                          <ArrowDown className="w-3 h-3 text-[#D1CBC0]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Live Technical Annotation Monitor with Stage Matching Accents */}
              <div
                id="pipeline-telemetry-monitor"
                className="bg-[#181A1B] text-[#F8F7F4] p-4 border-t border-[#E5E1D8] font-mono"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2C3033]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: activeStage.accentColor }}
                    />
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase"
                      style={{ color: activeStage.accentColor }}
                    >
                      INSPECTION: STAGE {activeStage.shortCode} [{activeStage.name}]
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A9B1BD] bg-[#23272A] px-1.5 py-0.5 rounded-xs border border-[#32373C]">
                    {activeStage.annotation.project}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-[11px] mb-3">
                  {activeStage.annotation.details.map((d, i) => (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <span className="text-[#87909C] text-[10px]">{d.label}:</span>
                      <span className="text-[#F8F7F4] text-right font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-[#23272A] rounded-xs border border-[#32373C] text-[10px] leading-relaxed text-[#D1CBC0]">
                  <span className="font-bold" style={{ color: activeStage.accentColor }}>
                    NOTE:{' '}
                  </span>
                  {activeStage.annotation.insight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
