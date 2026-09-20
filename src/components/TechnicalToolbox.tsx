import React, { useState } from 'react';
import { TOOLBOX_DATA } from '../data/portfolioData';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

export const TechnicalToolbox: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFeaturedSnippet, setActiveFeaturedSnippet] = useState<{
    name: string;
    category: string;
    code: string;
  }>({
    name: 'PyTorch',
    category: 'MACHINE LEARNING',
    code: 'import torch\ndevice = torch.device("cuda" if torch.cuda.is_available() else "cpu")\nprint(f"Executing PyTorch on: {device}")',
  });

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

  // Flatten tools with config snippets for quick selection
  const toolsWithSnippets = TOOLBOX_DATA.flatMap((cat) =>
    cat.tools
      .filter((t) => t.configSnippet)
      .map((t) => ({
        name: t.name,
        category: cat.category,
        code: t.configSnippet!,
      }))
  );

  return (
    <section id="toolbox" className="py-16 sm:py-24 border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-[#E5E1D8] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#C04A2A] rounded-full" />
              <span className="font-mono text-xs text-[#87909C] uppercase tracking-wider">SECTION 04</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181A1B] tracking-tight">
              CURRENT TOOLBOX
            </h2>
          </div>

          <p className="font-mono text-xs text-[#555C66] max-w-md">
            Technologies grouped by practical utility. No fabricated skill percentage bars. Click "Copy Snippet" on any tool for verified configuration strings.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLBOX_DATA.map((group, idx) => {
            const groupThemes = [
              { topBorder: 'border-t-[#2563EB]', badge: 'text-[#1E40AF] bg-[#DBEAFE] border-[#93C5FD]', dot: 'bg-[#2563EB]', tagBg: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]' },
              { topBorder: 'border-t-[#0D9488]', badge: 'text-[#0F766E] bg-[#CCFBF1] border-[#5EEAD4]', dot: 'bg-[#0D9488]', tagBg: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]' },
              { topBorder: 'border-t-[#059669]', badge: 'text-[#065F46] bg-[#D1FAE5] border-[#6EE7B7]', dot: 'bg-[#059669]', tagBg: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]' },
              { topBorder: 'border-t-[#D97706]', badge: 'text-[#92400E] bg-[#FEF3C7] border-[#FCD34D]', dot: 'bg-[#D97706]', tagBg: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]' },
              { topBorder: 'border-t-[#7C3AED]', badge: 'text-[#5B21B6] bg-[#EDE9FE] border-[#C4B5FD]', dot: 'bg-[#7C3AED]', tagBg: 'bg-[#F5F3FF] text-[#5B21B6] border-[#DDD6FE]' },
              { topBorder: 'border-t-[#E11D48]', badge: 'text-[#9F1239] bg-[#FFE4E6] border-[#FDA4AF]', dot: 'bg-[#E11D48]', tagBg: 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]' },
            ];
            const theme = groupThemes[idx % groupThemes.length];

            return (
              <div
                key={idx}
                className={`bg-[#FFFFFF] border border-[#E5E1D8] border-t-4 ${theme.topBorder} p-6 rounded-xs shadow-xs hover:shadow-sm transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E1D8]">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
                      <h3 className="font-mono text-xs font-bold text-[#181A1B] tracking-wider uppercase">
                        {group.category}
                      </h3>
                    </div>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-xs border font-semibold ${theme.badge}`}>
                      CAT-0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-[#555C66] mb-5 font-mono leading-relaxed">
                    {group.purpose}
                  </p>

                  <div className="space-y-4">
                    {group.tools.map((tool, tIdx) => {
                      const toolSlug = tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                      const isCopied = copiedId === `tool-${tool.name}`;

                      return (
                        <div key={tIdx} className="p-3 bg-[#F8F7F4] hover:bg-[#FAF9F7] border border-[#E5E1D8] rounded-xs space-y-2 transition-colors">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#181A1B]">{tool.name}</span>

                            <div className="flex items-center gap-1.5">
                              {tool.configSnippet && (
                                <button
                                  id={`btn-copy-tool-${toolSlug}`}
                                  onClick={() => {
                                    handleCopy(tool.configSnippet!, `tool-${tool.name}`);
                                    setActiveFeaturedSnippet({
                                      name: tool.name,
                                      category: group.category,
                                      code: tool.configSnippet!,
                                    });
                                  }}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] rounded-xs border transition-colors cursor-pointer ${
                                    isCopied
                                      ? 'bg-[#059669] text-white border-[#059669] font-bold shadow-xs'
                                      : 'bg-[#FFFFFF] text-[#555C66] border-[#E5E1D8] hover:border-[#181A1B] hover:text-[#181A1B]'
                                  }`}
                                  title={`Copy ${tool.name} configuration snippet`}
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="w-2.5 h-2.5 text-white" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-2.5 h-2.5 text-[#87909C]" />
                                      <span>Copy Snippet</span>
                                    </>
                                  )}
                                </button>
                              )}

                              {tool.tags && (
                                <div className="flex gap-1">
                                  {tool.tags.slice(0, 1).map((tg, gIdx) => (
                                    <span
                                      key={gIdx}
                                      className={`font-mono text-[9px] px-1.5 py-0.5 border rounded-xs font-medium ${theme.tagBg}`}
                                    >
                                      {tg}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-[11px] text-[#555C66] font-mono leading-relaxed">
                            "{tool.explanation}"
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Configuration Snippets Interactive Workbench */}
        <div className="bg-[#181A1B] border border-[#33373B] rounded-xs p-5 sm:p-6 shadow-xs text-[#F8F7F4] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2E3235]">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-[#C04A2A]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#FFFFFF]">
                KEY CONFIGURATION STRINGS & REPRODUCIBILITY SNIPPETS
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#87909C]">SELECT TOOL:</span>
              <div className="flex flex-wrap gap-1">
                {['PyTorch', 'scikit-learn', 'OpenCV', 'Streamlit', 'SQLite', 'Git'].map((tName) => {
                  const target = toolsWithSnippets.find((s) => s.name === tName);
                  if (!target) return null;
                  const isSelected = activeFeaturedSnippet.name === tName;

                  return (
                    <button
                      key={tName}
                      id={`btn-select-snippet-${tName.toLowerCase()}`}
                      onClick={() => setActiveFeaturedSnippet(target)}
                      className={`px-2 py-0.5 font-mono text-[10px] rounded-xs border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#C04A2A] text-white border-[#C04A2A] font-bold'
                          : 'bg-[#232628] text-[#D1CBC0] border-[#3E4348] hover:border-[#87909C]'
                      }`}
                    >
                      {tName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#D1CBC0]">
                <Code2 className="w-3.5 h-3.5 text-[#C04A2A]" />
                <span className="font-bold text-[#FFFFFF]">{activeFeaturedSnippet.name}</span>
                <span>·</span>
                <span className="text-[#87909C]">{activeFeaturedSnippet.category}</span>
              </div>

              <button
                id="btn-copy-featured-snippet"
                onClick={() => handleCopy(activeFeaturedSnippet.code, `featured-${activeFeaturedSnippet.name}`)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs rounded-xs transition-colors cursor-pointer ${
                  copiedId === `featured-${activeFeaturedSnippet.name}`
                    ? 'bg-[#C04A2A] text-white font-bold'
                    : 'bg-[#2E3235] text-[#F8F7F4] hover:bg-[#3E4348] border border-[#44494E]'
                }`}
              >
                {copiedId === `featured-${activeFeaturedSnippet.name}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D1CBC0]" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-[#0F1011] border border-[#2E3235] rounded-xs overflow-x-auto selection:bg-[#C04A2A] selection:text-white">
              <pre className="font-mono text-xs text-[#E5E1D8] whitespace-pre leading-relaxed">
                {activeFeaturedSnippet.code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
