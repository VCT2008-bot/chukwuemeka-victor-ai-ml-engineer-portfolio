import React, { useState } from 'react';
import { FileText, Download, Printer, Eye, X, Check, Award, GraduationCap, Code2, Briefcase } from 'lucide-react';

interface ResumeSectionProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ isOpenModal = false, onCloseModal }) => {
  const [showDocumentView, setShowDocumentView] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const resumeContent = (
    <div
      id="printable-resume-document"
      className="bg-[#FFFFFF] border border-[#E5E1D8] p-8 sm:p-12 rounded-xs shadow-xs font-mono max-w-4xl mx-auto space-y-8 print:p-0 print:border-none print:shadow-none"
    >
      {/* Resume Document Header */}
      <div className="border-b-2 border-[#181A1B] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#181A1B] tracking-tight">
            CHUKWUEMEKA VICTOR CHUKWUEMEKA
          </h1>
          <span className="text-xs text-[#C04A2A] font-bold">NIGERIA · OPEN TO OPPORTUNITIES</span>
        </div>

        <p className="text-xs text-[#555C66] mb-3">
          AI/ML Engineer · Software Builder · Medical Laboratory Science Student
        </p>

        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#555C66] border-t border-[#E5E1D8] pt-2">
          <span>Email: chukwuemekavictor726@gmail.com</span>
          <span>·</span>
          <span>GitHub: github.com/chukwuemekavictor</span>
          <span>·</span>
          <span>Focus: Applied ML · Computer Vision · Healthcare Tech</span>
        </div>
      </div>

      {/* Core Profile Narrative */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#181A1B] border-b border-[#E5E1D8] pb-1">
          ENGINEERING SUMMARY
        </h2>
        <p className="text-xs text-[#555C66] leading-relaxed">
          Emerging AI/ML Engineer with rigorous clinical foundation in Medical Laboratory Science. Focused on taking
          datasets from structured preprocessing and statistical auditing through model training, metric evaluation,
          and into reliable software interfaces. Experienced in deep learning for computer vision (PyTorch), classical
          estimators (scikit-learn), and full-stack web platforms (React, TypeScript, SQLite).
        </p>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#181A1B] border-b border-[#E5E1D8] pb-1">
          EDUCATION & ACADEMIC BACKGROUND
        </h2>

        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
            <strong className="text-[#181A1B]">Bachelor of Medical Laboratory Science (B.MLS) — In Progress</strong>
            <span className="text-[#87909C]">Nigeria</span>
          </div>
          <p className="text-[11px] text-[#555C66]">
            Specialized training in Clinical Chemistry, Hematology, Histopathology, Medical Microbiology, Quality Control,
            and Laboratory Instrumentation. Applied statistical protocols to error analysis and analytical calibration.
          </p>
        </div>
      </div>

      {/* Technical Competencies */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#181A1B] border-b border-[#E5E1D8] pb-1">
          TECHNICAL TOOLBOX & METHODOLOGIES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#87909C] block">MACHINE LEARNING & VISION</span>
            <p className="text-[#181A1B]">Python, PyTorch, TensorFlow, scikit-learn, OpenCV, CNNs, Grad-CAM</p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-[#87909C] block">DATA & EXPERIMENTATION</span>
            <p className="text-[#181A1B]">Pandas, NumPy, Jupyter Notebooks, Data Leakage Isolation, Stratified CV</p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-[#87909C] block">APPLICATIONS & DEPLOYMENT</span>
            <p className="text-[#181A1B]">Streamlit, React, TypeScript, Node.js, Express, SQLite, REST APIs</p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-[#87909C] block">DISCIPLINE & PRACTICES</span>
            <p className="text-[#181A1B]">Git, Version Control, SOP Protocols, Diagnostic Quality Assurance</p>
          </div>
        </div>
      </div>

      {/* Selected Engineering Projects */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#181A1B] border-b border-[#E5E1D8] pb-1">
          VERIFIED ENGINEERING PROJECTS & EXPERIMENTS
        </h2>

        {/* PathoSense */}
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
            <span className="font-bold text-[#181A1B]">PathoSense — Histopathology Image Classification (CNN)</span>
            <span className="text-[#C04A2A] font-semibold">~93.78% Val Accuracy (Epoch 9)</span>
          </div>
          <p className="text-[11px] text-[#555C66] leading-relaxed">
            Engineered multi-stage PyTorch CNN classifying 9 colorectal tissue types from 100K+ PathMNIST patches.
            Implemented Grad-CAM to verify feature attention on cellular density. Built interactive Streamlit demo.
          </p>
        </div>

        {/* Heart Disease */}
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
            <span className="font-bold text-[#181A1B]">Heart Disease Clinical Benchmark (KNN)</span>
            <span className="text-[#181A1B]">F1 Score ~0.8305 (k=9, Manhattan)</span>
          </div>
          <p className="text-[11px] text-[#555C66] leading-relaxed">
            Evaluated distance-based estimators across 14 tabular clinical features on UCI Heart Disease dataset.
            Demonstrated feature scale sensitivity and eliminated data leakage through isolated transformation pipelines.
          </p>
        </div>

        {/* Banknote */}
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
            <span className="font-bold text-[#181A1B]">Banknote Specimen Classifier (CNN)</span>
            <span className="text-[#181A1B]">88.10% Accuracy · 88.03% Weighted F1</span>
          </div>
          <p className="text-[11px] text-[#555C66] leading-relaxed">
            Designed image classification pipeline evaluating the alignment of raw accuracy and weighted F1 under
            variable lighting and specimen wear conditions.
          </p>
        </div>
      </div>
    </div>
  );

  // If invoked as modal
  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 bg-[#181A1B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-[#F8F7F4] border border-[#E5E1D8] w-full max-w-4xl my-8 rounded-xs shadow-xl overflow-hidden">
          <div className="p-4 bg-[#F2EFE9] border-b border-[#E5E1D8] flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#181A1B] uppercase tracking-wider">
              ENGINEERING PROFILE / RESUME PREVIEW
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E1D8] text-xs font-mono text-[#181A1B] hover:bg-[#F8F7F4] rounded-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onCloseModal}
                className="p-1 text-[#555C66] hover:text-[#181A1B] hover:bg-[#E5E1D8] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[80vh] overflow-y-auto">{resumeContent}</div>
        </div>
      </div>
    );
  }

  // Standard inline section
  return (
    <section id="resume" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#C04A2A] rounded-full" />
              <span className="font-mono text-xs text-[#87909C] uppercase tracking-wider">SECTION 09</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              ENGINEERING PROFILE
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Professional technical background, clinical laboratory training, and verified engineering capabilities.
          </p>
        </div>

        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="font-mono text-xs text-[#555C66]">
            Presented as an authentic engineering curriculum vitae. No inflated claims or fabricated positions.
          </p>

          <div className="flex items-center gap-3">
            <button
              id="btn-toggle-resume-view"
              onClick={() => setShowDocumentView(!showDocumentView)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#181A1B] text-[#F8F7F4] text-xs font-mono tracking-wider hover:bg-[#C04A2A] transition-colors rounded-xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showDocumentView ? 'COLLAPSE DOCUMENT' : 'VIEW RESUME DOCUMENT'}</span>
            </button>

            <button
              id="btn-print-download-pdf"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FFFFFF] border border-[#E5E1D8] text-[#181A1B] text-xs font-mono tracking-wider hover:bg-[#F2EFE9] transition-colors rounded-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
          </div>
        </div>

        {/* Document Rendering */}
        {showDocumentView ? (
          <div className="animate-in fade-in duration-200">{resumeContent}</div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 sm:p-8 rounded-xs shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#87909C] block">CURRICULUM VITAE SUMMARY</span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#181A1B]">
                Chukwuemeka Victor — AI/ML Engineer & Medical Laboratory Science Student
              </h3>
              <p className="font-mono text-xs text-[#555C66] max-w-2xl leading-relaxed">
                Includes clinical degree coursework, machine-learning toolsets (PyTorch, scikit-learn), three verified
                case-study experiments, and systematic quality assurance methodologies.
              </p>
            </div>

            <button
              onClick={() => setShowDocumentView(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F2EFE9] border border-[#E5E1D8] hover:bg-[#181A1B] hover:text-white text-[#181A1B] text-xs font-mono tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#C04A2A]" />
              <span>EXPAND COMPLETE RESUME</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
