import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Terminal, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../api/client';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const directEmail = 'chukwuemekavictor726@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      const res = await api.sendContactMessage({
        name,
        email: emailInput,
        subject: subject || 'Technical Inquiry',
        message,
        _gotcha: honeypot
      });

      setSubmitStatus({
        success: true,
        message: res.message || 'Message securely logged in the laboratory system. Victor will review it shortly.'
      });

      // Clear form on success
      setName('');
      setEmailInput('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setSubmitStatus({
        success: false,
        message: err.message || 'Failed to submit inquiry. Please try again or email directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#C04A2A] rounded-full" />
              <span className="font-mono text-xs text-[#87909C] uppercase tracking-wider">SECTION 10</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              HAVE A TECHNICAL PROBLEM?
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Direct communication channel for internships, research, and engineering collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Statement & Direct Links */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 sm:p-8 rounded-xs shadow-xs space-y-4">
              <p className="font-serif text-xl sm:text-2xl text-[#181A1B] leading-relaxed">
                "I'm interested in internships, research opportunities, engineering collaborations, and projects
                involving machine learning or healthcare technology."
              </p>

              <p className="text-sm text-[#555C66] font-mono leading-relaxed">
                Whether you need assistance with dataset preprocessing, evaluating computer vision models, or building
                clean software harnesses around technical data, I welcome technically focused conversations.
              </p>
            </div>

            {/* Direct Connect Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {/* Email */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#87909C] uppercase block mb-1">DIRECT INBOX</span>
                  <a
                    href={`mailto:${directEmail}`}
                    className="font-bold text-[#181A1B] hover:text-[#C04A2A] transition-colors break-all"
                  >
                    {directEmail}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#555C66] hover:text-[#181A1B] mt-3 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#C04A2A]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy email'}</span>
                </button>
              </div>

              {/* GitHub */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#87909C] uppercase block mb-1">SOURCE CODE</span>
                  <p className="font-bold text-[#181A1B]">github.com/chukwuemekavictor</p>
                </div>
                <a
                  href="https://github.com/chukwuemekavictor"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#C04A2A] hover:underline mt-3"
                >
                  <span>Open profile</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* LinkedIn */}
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#87909C] uppercase block mb-1">PROFESSIONAL</span>
                  <p className="font-bold text-[#181A1B]">Chukwuemeka Victor</p>
                </div>
                <a
                  href="https://linkedin.com/in/chukwuemekavictor"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#C04A2A] hover:underline mt-3"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Real Backend Direct Contact Form */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E1D8] p-6 rounded-xs shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E1D8]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#C04A2A]" />
                <span className="font-mono text-xs font-bold uppercase text-[#181A1B] tracking-wider">
                  TRANSMIT TO LAB INBOX
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#87909C]">POST /api/contact</span>
            </div>

            {submitStatus && (
              <div
                className={`p-3.5 mb-4 text-xs font-mono rounded-xs border flex items-start gap-2.5 ${
                  submitStatus.success
                    ? 'bg-[#F2EFE9] border-[#181A1B] text-[#181A1B]'
                    : 'bg-[#F9EFEB] border-[#C04A2A]/30 text-[#C04A2A]'
                }`}
              >
                {submitStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#181A1B]" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div className="leading-relaxed">{submitStatus.message}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {/* Honeypot field for spam prevention */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="contact-name" className="block text-[10px] uppercase text-[#87909C] mb-1">
                  YOUR NAME / AFFILIATION:
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g., Dr. Adaeze / Engineering Recruiter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#181A1B]"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] uppercase text-[#87909C] mb-1">
                  YOUR EMAIL ADDRESS:
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="e.g., recruiter@organization.org"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#181A1B]"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-[10px] uppercase text-[#87909C] mb-1">
                  SUBJECT / TOPIC:
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="e.g., ML Internship / Research Collaboration / Pipeline Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#181A1B]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] uppercase text-[#87909C] mb-1">
                  MESSAGE / PROBLEM STATEMENT:
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Outline your problem, research area, or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E1D8] rounded-xs text-[#181A1B] placeholder:text-[#87909C] focus:outline-none focus:border-[#181A1B] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#181A1B] text-[#F8F7F4] hover:bg-[#C04A2A] transition-colors rounded-xs cursor-pointer font-bold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>RECORDING IN LABORATORY INBOX...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT MESSAGE DIRECTLY</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] text-[#87909C] pt-1 border-t border-[#E5E1D8]">
                <span>Rate limited & stored in SQLite database</span>
                <a
                  href={`mailto:${directEmail}?subject=${encodeURIComponent(
                    subject || 'Technical Inquiry'
                  )}&body=${encodeURIComponent(message)}`}
                  className="hover:text-[#181A1B] underline"
                >
                  Or open default mail client
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
