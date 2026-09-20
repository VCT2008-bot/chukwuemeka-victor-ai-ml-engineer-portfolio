import React, { useState, useEffect } from 'react';
import { ArrowUpRight, AlertTriangle, Terminal, Search } from 'lucide-react';
import { EXPERIMENTS } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { api } from '../api/client';

interface SelectedExperimentsProps {
  onOpenCaseStudy: (id: string) => void;
}

export const SelectedExperiments: React.FC<SelectedExperimentsProps> = ({ onOpenCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All', activeColor: 'bg-[#181A1B] text-[#F8F7F4] border-[#181A1B]' },
    { label: 'Machine Learning', activeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B] font-bold' },
    { label: 'Deep Learning', activeColor: 'bg-[#FFE4E6] text-[#9F1239] border-[#F43F5E] font-bold' },
    { label: 'Computer Vision', activeColor: 'bg-[#DBEAFE] text-[#1E40AF] border-[#3B82F6] font-bold' },
    { label: 'Healthcare', activeColor: 'bg-[#D1FAE5] text-[#065F46] border-[#10B981] font-bold' }
  ];

  // Filter local static verified data
  const filteredExperiments: CaseStudy[] = EXPERIMENTS.filter((exp: CaseStudy) => {
    const matchesCategory =
      activeCategory === 'All' ||
      exp.discipline.toLowerCase().includes(activeCategory.toLowerCase()) ||
      exp.title.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.discipline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const pathosense = EXPERIMENTS.find((e) => e.id === 'pathosense')!;
  const heartDisease = EXPERIMENTS.find((e) => e.id === 'heart-disease')!;
  const banknote = EXPERIMENTS.find((e) => e.id === 'banknote-classifier')!;

  return (
    <section id="experiments" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#C04A2A] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#C04A2A] font-bold uppercase tracking-wider">SECTION 03</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              SELECTED EXPERIMENTS
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Systems and models I've built to understand how machine learning behaves outside the notebook.
          </p>
        </div>

        {/* Filter & Search Bar with vibrant color indicators */}
        <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-[10px] uppercase text-[#87909C] mr-1 hidden sm:inline">DISCIPLINE:</span>
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer ${
                  activeCategory === cat.label
                    ? cat.activeColor
                    : 'bg-[#FFFFFF] text-[#555C66] border-[#E5E1D8] hover:border-[#D1CBC0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#87909C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search experiments, models, datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#C04A2A]"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredExperiments.length === 0 && (
          <div className="p-12 bg-[#FFFFFF] border border-[#E5E1D8] text-center font-mono rounded-xs my-8 space-y-2">
            <Terminal className="w-6 h-6 text-[#C04A2A] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#181A1B]">NO EXPERIMENTS FOUND</p>
            <p className="text-xs text-[#555C66]">The lab notebook has no records matching your query.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1 text-xs border border-[#E5E1D8] hover:bg-[#F2EFE9] rounded-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="space-y-10">
          {/* ============================================================
              PROJECT 01: PATHOSENSE (Large Horizontal Area) - Crimson Theme
             ============================================================ */}
          {filteredExperiments.some((e) => e.id === 'pathosense') && (
            <div
              id="exp-card-pathosense"
              className="bg-[#FFFFFF] border border-[#FECDD3] border-t-4 border-t-[#E11D48] hover:shadow-md transition-all rounded-xs overflow-hidden shadow-xs group"
            >
              <div className="px-6 py-3.5 bg-gradient-to-r from-[#FFF1F2] via-[#FFF5F6] to-[#FFFFFF] border-b border-[#FECDD3] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#9F1239] bg-[#FFE4E6] px-2.5 py-0.5 border border-[#FDA4AF] rounded-xs shadow-2xs">
                    {pathosense.number}
                  </span>
                  <span className="font-mono text-xs text-[#E11D48] uppercase tracking-wider font-semibold">DEEP LEARNING HISTOPATHOLOGY</span>
                  <span className="hidden sm:inline-block text-[#FECDD3]">·</span>
                  <span className="hidden sm:inline-block font-mono text-xs text-[#555C66]">
                    {pathosense.discipline}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#9F1239] font-bold bg-[#FFE4E6] px-2.5 py-0.5 border border-[#FDA4AF] rounded-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                    STATUS: {pathosense.status}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#181A1B] tracking-tight mb-2">
                      {pathosense.title}
                    </h3>
                    <p className="text-sm font-mono text-[#555C66] leading-relaxed">
                      {pathosense.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-[#181A1B] font-serif leading-relaxed">
                    {pathosense.question}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                    <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                      <span className="text-[10px] uppercase text-[#87909C] block">TASK</span>
                      <span className="font-bold text-[#181A1B]">Tissue Classification</span>
                    </div>

                    <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                      <span className="text-[10px] uppercase text-[#87909C] block">MODEL</span>
                      <span className="font-bold text-[#181A1B]">{pathosense.approach.architecture}</span>
                    </div>

                    <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                      <span className="text-[10px] uppercase text-[#87909C] block">DATASET</span>
                      <span className="font-bold text-[#181A1B]">{pathosense.data.name}</span>
                    </div>

                    <div className="p-2.5 bg-[#FFF1F2] border border-[#FECDD3] rounded-xs">
                      <span className="text-[10px] uppercase text-[#E11D48] font-bold block">RESULT</span>
                      <span className="font-bold text-[#BE123C] text-sm">{pathosense.result.headlineMetric}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      id="btn-open-pathosense-study"
                      onClick={() => onOpenCaseStudy('pathosense')}
                      className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#E11D48] text-[#FFFFFF] text-xs font-mono tracking-wider hover:bg-[#BE123C] transition-colors rounded-xs cursor-pointer shadow-xs font-semibold"
                    >
                      <span>OPEN COMPLETE CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href="https://github.com/chukwuemekavictor/PathoSense"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono border border-[#FECDD3] text-[#9F1239] bg-[#FFF1F2] hover:bg-[#FFE4E6] transition-colors rounded-xs"
                    >
                      <Terminal className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F6] to-[#F8F7F4] border border-[#FECDD3] p-5 rounded-xs space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#FECDD3]">
                    <span className="text-[10px] uppercase text-[#9F1239] font-bold">TRAINING TELEMETRY</span>
                    <span className="text-[10px] text-[#BE123C] font-bold bg-[#FFE4E6] px-2 py-0.5 rounded-xs border border-[#FDA4AF]">
                      EPOCH 9 / 15
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#555C66] font-medium">Validation Accuracy</span>
                      <span className="font-bold text-[#BE123C]">{pathosense.result.headlineMetric}</span>
                    </div>
                    <div className="w-full bg-[#FECDD3] h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#C04A2A] via-[#E11D48] to-[#BE123C] h-full shadow-xs" style={{ width: '93.78%' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#555C66]">Input Patches:</span>
                      <span className="text-[#181A1B] font-semibold">107,180 (28x28 MedMNIST)</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#555C66]">Classes:</span>
                      <span className="text-[#181A1B] font-semibold">9 Colorectal Tissue Types</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#555C66]">Explainability:</span>
                      <span className="text-[#BE123C] font-bold bg-[#FFE4E6] px-1.5 py-0.5 rounded-xs">Grad-CAM Attention Verified</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFFFFF] border border-[#FECDD3] rounded-xs text-[11px] text-[#555C66]">
                    <strong className="text-[#9F1239] block mb-0.5 font-bold">Key Limitation:</strong>
                    Trained on 28x28 patches. Educational model, not an independent clinical diagnostic device.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              SPLIT SECTION: PROJECT 02 (HEART DISEASE) + PROJECT 03 (BANKNOTE)
             ============================================================ */}
          {filteredExperiments.some((e) => e.id === 'heart-disease' || e.id === 'banknote-classifier') && (
            <div
              className={`grid gap-8 ${
                filteredExperiments.some((e) => e.id === 'heart-disease') &&
                filteredExperiments.some((e) => e.id === 'banknote-classifier')
                  ? 'grid-cols-1 lg:grid-cols-2'
                  : 'grid-cols-1'
              }`}
            >
              {/* Heart Disease - Clinical Amber Theme */}
              {filteredExperiments.some((e) => e.id === 'heart-disease') && (
              <div
                id="exp-card-heart-disease"
                className="bg-[#FFFFFF] border border-[#FDE68A] border-t-4 border-t-[#D97706] hover:shadow-md transition-all rounded-xs overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="px-6 py-3 bg-gradient-to-r from-[#FFFBEB] to-[#FFFFFF] border-b border-[#FDE68A] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 border border-[#FCD34D] rounded-xs">
                        {heartDisease.number}
                      </span>
                      <span className="font-mono text-[10px] text-[#B45309] font-bold uppercase">{heartDisease.discipline}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded-xs border border-[#FDE68A] font-semibold">
                      STATUS: {heartDisease.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl text-[#181A1B] tracking-tight mb-1">
                        {heartDisease.title}
                      </h3>
                      <p className="text-xs font-mono text-[#555C66]">{heartDisease.subtitle}</p>
                    </div>

                    <p className="text-xs text-[#181A1B] font-serif leading-relaxed">
                      {heartDisease.question}
                    </p>

                    <div className="p-3 bg-[#FFFBEB] border-l-4 border-l-[#D97706] border border-[#FDE68A] rounded-r-xs flex items-start gap-2 text-xs font-mono text-[#92400E]">
                      <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <strong>Scientific Caveat:</strong> Educational machine-learning experiment. Not a clinical
                        diagnostic system.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      <div className="p-2.5 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs">
                        <span className="text-[10px] uppercase text-[#87909C] block">MODEL</span>
                        <span className="font-bold text-[#181A1B]">KNN (k=9, Manhattan)</span>
                      </div>
                      <div className="p-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-xs">
                        <span className="text-[10px] uppercase text-[#B45309] font-bold block">EVALUATION F1</span>
                        <span className="font-bold text-[#92400E] text-sm">≈ 0.8305</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#FFFBEB]/40 border-t border-[#FDE68A] flex items-center justify-between">
                  <button
                    onClick={() => onOpenCaseStudy('heart-disease')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#92400E] hover:text-[#B45309] transition-colors cursor-pointer"
                  >
                    <span>Inspect Investigation Log</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-xs border border-[#FDE68A]">
                    n=303 records
                  </span>
                </div>
              </div>
            )}

            {/* Banknote Classifier - Electric Indigo/Blue Theme */}
            {filteredExperiments.some((e) => e.id === 'banknote-classifier') && (
              <div
                id="exp-card-banknote"
                className="bg-[#FFFFFF] border border-[#BFDBFE] border-t-4 border-t-[#2563EB] hover:shadow-md transition-all rounded-xs overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="px-6 py-3 bg-gradient-to-r from-[#EFF6FF] to-[#FFFFFF] border-b border-[#BFDBFE] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1E40AF] bg-[#DBEAFE] px-2 py-0.5 border border-[#93C5FD] rounded-xs">
                        {banknote.number}
                      </span>
                      <span className="font-mono text-[10px] text-[#1D4ED8] font-bold uppercase">{banknote.discipline}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#1E40AF] bg-[#DBEAFE] px-2 py-0.5 rounded-xs border border-[#BFDBFE] font-semibold">
                      STATUS: {banknote.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl text-[#181A1B] tracking-tight mb-1">
                        {banknote.title}
                      </h3>
                      <p className="text-xs font-mono text-[#555C66]">{banknote.subtitle}</p>
                    </div>

                    <p className="text-xs text-[#181A1B] font-serif leading-relaxed">
                      {banknote.question}
                    </p>

                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      <div className="p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xs">
                        <span className="text-[10px] uppercase text-[#1D4ED8] font-bold block">ACCURACY</span>
                        <span className="font-bold text-[#1E40AF] text-sm">88.10%</span>
                      </div>
                      <div className="p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xs">
                        <span className="text-[10px] uppercase text-[#1D4ED8] font-bold block">WEIGHTED F1</span>
                        <span className="font-bold text-[#1E40AF] text-sm">88.03%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#BFDBFE] rounded-xs text-xs font-mono text-[#475569]">
                      <strong className="text-[#1E40AF] block mb-0.5">Core Finding:</strong>
                      Close agreement between accuracy and weighted F1 proved uniform denomination performance under
                      lighting and specimen wear variance.
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#EFF6FF]/40 border-t border-[#BFDBFE] flex items-center justify-between">
                  <button
                    onClick={() => onOpenCaseStudy('banknote-classifier')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors cursor-pointer"
                  >
                    <span>Inspect Vision Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-[#1E40AF] bg-[#DBEAFE] px-2 py-0.5 rounded-xs border border-[#93C5FD]">
                    OpenCV + PyTorch
                  </span>
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};
