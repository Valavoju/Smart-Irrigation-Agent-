import React from 'react';
import { Droplets, Sparkles, ShieldCheck, Sun, Leaf, CloudRain, Cpu, FileDown } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'architecture' | 'comparison' | 'future';
  setActiveTab: (tab: 'dashboard' | 'architecture' | 'comparison' | 'future') => void;
  onOpenFutureModal: () => void;
  onDownloadReport?: () => void;
  onOpenReport?: () => void;
  isReportReady?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenFutureModal,
  onDownloadReport,
  onOpenReport,
  isReportReady,
}) => {
  return (
    <header className="border-b border-emerald-900/10 bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Wordmark & Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/15 shrink-0">
            <Droplets className="w-5 h-5 fill-white/20" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-extrabold tracking-tight text-[#0F291E]">
                SMART IRRIGATION AGENT
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-900/70 hidden sm:inline">
              Agentic AI for Intelligent Water Conservation
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'text-[#0F291E] bg-emerald-50 font-semibold border border-emerald-200/80 shadow-2xs'
                : 'hover:text-[#0F291E] hover:bg-stone-100/60'
            }`}
          >
            Agent Dashboard
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'text-[#0F291E] bg-emerald-50 font-semibold border border-emerald-200/80 shadow-2xs'
                : 'hover:text-[#0F291E] hover:bg-stone-100/60'
            }`}
          >
            Agentic Pipeline
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'text-[#0F291E] bg-emerald-50 font-semibold border border-emerald-200/80 shadow-2xs'
                : 'hover:text-[#0F291E] hover:bg-stone-100/60'
            }`}
          >
            Timer vs Agent
          </button>
          <button
            onClick={() => setActiveTab('future')}
            className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'future'
                ? 'text-[#0F291E] bg-emerald-50 font-semibold border border-emerald-200/80 shadow-2xs'
                : 'hover:text-[#0F291E] hover:bg-stone-100/60'
            }`}
          >
            Future Roadmap
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5">
          {isReportReady && onDownloadReport && (
            <button
              onClick={onDownloadReport}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-all shadow-2xs whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              title="Download One-Page PDF Report"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">📄 Download Report</span>
              <span className="sm:hidden">Report</span>
            </button>
          )}

          <button
            onClick={onOpenFutureModal}
            className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-[#14532D] hover:from-emerald-800 hover:to-[#0F3822] text-white transition-all shadow-sm shadow-emerald-900/20 whitespace-nowrap flex items-center gap-2 border border-emerald-600/30 active:scale-[0.98] cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">Agent Architecture</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono font-bold">5 AGENTS</span>
          </button>
        </div>
      </div>

      {/* Hero Sub-header Context Bar */}
      <div className="border-t border-emerald-900/5 bg-[#F8FAF8] py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#0F291E] font-semibold flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Autonomous Agricultural Decision Engine
            </span>
            <span className="text-stone-300 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-2.5 text-stone-600">
              <span className="text-emerald-700 font-bold bg-emerald-100/60 px-1.5 py-0.5 rounded">SDG 6</span>
              <span>Clean Water & Sanitation</span>
              <span className="text-stone-300">|</span>
              <span className="text-amber-700 font-bold bg-amber-100/60 px-1.5 py-0.5 rounded">SDG 2</span>
              <span>Zero Hunger</span>
              <span className="text-stone-300 hidden lg:inline">|</span>
              <span className="text-sky-700 font-bold bg-sky-100/60 px-1.5 py-0.5 rounded hidden lg:inline">SDG 13</span>
              <span className="hidden lg:inline">Climate Action</span>
            </div>
          </div>
          <div className="text-emerald-900/80 italic text-[11px] shrink-0 border-l border-emerald-900/10 pl-3">
            "Don't irrigate because the clock says so. Irrigate because the crop actually needs it."
          </div>
        </div>
      </div>
    </header>
  );
};
