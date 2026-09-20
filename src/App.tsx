import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LabSection } from './components/LabSection';
import { SelectedExperiments } from './components/SelectedExperiments';
import { ExperimentCaseStudy } from './components/ExperimentCaseStudy';
import { TechnicalToolbox } from './components/TechnicalToolbox';
import { EngineeringProcess } from './components/EngineeringProcess';
import { WhatFailed } from './components/WhatFailed';
import { LearningLog } from './components/LearningLog';
import { OpenWork } from './components/OpenWork';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminCMS } from './components/AdminCMS';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Synchronize hash with case study / navigation / admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['pathosense', 'heart-disease', 'banknote-classifier'].includes(hash)) {
        setActiveCaseStudyId(hash);
        setIsAdminOpen(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === 'resume-doc') {
        setIsResumeModalOpen(true);
      } else if (hash === 'admin' || hash === 'admin/login') {
        setIsAdminOpen(true);
        setActiveCaseStudyId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash) {
        setActiveCaseStudyId(null);
        setIsAdminOpen(false);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync active navigation tab with scroll position
  useEffect(() => {
    if (activeCaseStudyId || isAdminOpen) return;

    const sections = ['hero', 'lab', 'experiments', 'toolbox', 'process', 'failures', 'learning', 'open-work', 'resume', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCaseStudyId, isAdminOpen]);

  // Keyboard navigation: ESC to close case study, modal, or admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isResumeModalOpen) {
          setIsResumeModalOpen(false);
        } else if (activeCaseStudyId) {
          handleBackToMain();
        } else if (isAdminOpen) {
          setIsAdminOpen(false);
          history.pushState(null, '', ' ');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeModalOpen, activeCaseStudyId, isAdminOpen]);

  const handleOpenCaseStudy = (id: string) => {
    setActiveCaseStudyId(id);
    setIsAdminOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setActiveCaseStudyId(null);
    setIsAdminOpen(false);
    history.pushState(null, '', ' ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activeCaseStudyId || isAdminOpen) {
      setActiveCaseStudyId(null);
      setIsAdminOpen(false);
      history.pushState(null, '', ' ');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin Control Room is active, render the full admin dashboard
  if (isAdminOpen) {
    return (
      <AdminCMS
        onBackToPublic={() => {
          setIsAdminOpen(false);
          history.pushState(null, '', ' ');
        }}
      />
    );
  }

  // If a dedicated Case Study is active, show the full-page case study view
  if (activeCaseStudyId) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] text-[#181A1B] flex flex-col justify-between selection:bg-[#C04A2A] selection:text-white">
        <ExperimentCaseStudy
          caseStudyId={activeCaseStudyId}
          onBack={handleBackToMain}
          onSelectCaseStudy={handleOpenCaseStudy}
        />
        <Footer
          onScrollToTop={scrollToTop}
          onOpenResume={() => setIsResumeModalOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
        {isResumeModalOpen && (
          <ResumeSection isOpenModal={true} onCloseModal={() => setIsResumeModalOpen(false)} />
        )}
      </div>
    );
  }

  // Primary Portfolio Layout
  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#181A1B] flex flex-col justify-between selection:bg-[#C04A2A] selection:text-white">
      {/* Sticky Minimal Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeModalOpen(true)}
        isCaseStudyOpen={false}
        onBackToMain={handleBackToMain}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-grow">
        {/* Section 01: Hero with Asymmetric Layout & Interactive Model Pipeline Instrument */}
        <Hero
          onExploreExperiments={() => handleNavigate('experiments')}
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        {/* Section 02: The Lab (Medical Lab Science & Scientific Discipline translated to ML) */}
        <LabSection />

        {/* Section 03: Selected Experiments (Machine Learning Models: PathoSense, Heart Disease, Banknote) */}
        <SelectedExperiments onOpenCaseStudy={handleOpenCaseStudy} />

        {/* Section 04: Current Toolbox (Grouped by purpose, no fake percentages) */}
        <TechnicalToolbox />

        {/* Section 05: Engineering Process (8-Stage Laboratory Protocol) */}
        <EngineeringProcess />

        {/* Section 06: Things I Had To Figure Out (Authentic What Failed & Engineering Post-Mortems) */}
        <WhatFailed />

        {/* Section 07: Currently Exploring (Live Learning Log with real topics & dates) */}
        <LearningLog />

        {/* Section 08: Open Work (Editorial Curated GitHub Repositories) */}
        <OpenWork />

        {/* Section 09: Engineering Profile (Clean, Document-style Resume with Print Support) */}
        <ResumeSection />

        {/* Section 10: Have a Technical Problem? (Direct Contact & Collaboration) */}
        <ContactSection />
      </main>

      {/* Section 11: Minimal Technical Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Resume Modal View when triggered from navbar or quick link */}
      {isResumeModalOpen && (
        <ResumeSection isOpenModal={true} onCloseModal={() => setIsResumeModalOpen(false)} />
      )}
    </div>
  );
}
