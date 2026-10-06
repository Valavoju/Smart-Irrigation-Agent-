import React from 'react';
import { Leaf, Cpu, FileDown } from 'lucide-react';

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
    <header className="border-b border-emerald-900/10 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs w-full">
      {/* ROW 1: BRAND / TITLE, NAVIGATION & ACTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 min-h-[76px]">
        {/* Left Side: Brand Icon & Clear 3-Level Title Hierarchy */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/15 shrink-0 mt-0.5 sm:mt-0">
            <Leaf className="w-5 h-5 fill-white/20" />
          </div>
          <div className="flex flex-col space-y-0.5">
            {/* Main Title & Status Indicator */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F291E] leading-tight">
                SMART IRRIGATION AGENT
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </span>
            </div>
            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold text-emerald-800/90 leading-normal">
              Agentic AI for Intelligent Water Conservation
            </p>
            {/* Product Descriptor */}
            <p className="text-[11px] sm:text-xs text-stone-500 font-medium leading-normal">
              Autonomous Agricultural Decision Engine
            </p>
          </div>
        </div>

        {/* Right Side: Navigation Links & Actions */}
        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-[#0F291E] bg-emerald-50 font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#0F291E] hover:bg-stone-100/60'
              }`}
            >
              Agent Dashboard
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'architecture'
                  ? 'text-[#0F291E] bg-emerald-50 font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#0F291E] hover:bg-stone-100/60'
              }`}
            >
              Agentic Pipeline
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'comparison'
                  ? 'text-[#0F291E] bg-emerald-50 font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#0F291E] hover:bg-stone-100/60'
              }`}
            >
              Timer vs Agent
            </button>
            <button
              onClick={() => setActiveTab('future')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'future'
                  ? 'text-[#0F291E] bg-emerald-50 font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#0F291E] hover:bg-stone-100/60'
              }`}
            >
              Future Roadmap
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isReportReady && onDownloadReport && (
              <button
                onClick={onDownloadReport}
                className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-all shadow-2xs whitespace-nowrap flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
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
      </div>

      {/* ROW 2: SDG INFORMATION & RIGHT-SIDE QUOTE */}
      <div className="border-t border-emerald-900/5 bg-[#F8FAF8] px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 text-xs">
          {/* Left Side: Clean SDG Badges & Labels */}
          <div className="flex items-center gap-3 flex-wrap text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-800 font-bold bg-emerald-100/80 border border-emerald-200/90 px-1.5 py-0.5 rounded text-[11px]">
                SDG 6
              </span>
              <span className="font-semibold text-stone-700">Clean Water & Sanitation</span>
            </div>
            <span className="text-stone-300 hidden sm:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-800 font-bold bg-amber-100/80 border border-amber-200/90 px-1.5 py-0.5 rounded text-[11px]">
                SDG 2
              </span>
              <span className="font-semibold text-stone-700">Zero Hunger</span>
            </div>
            <span className="text-stone-300 hidden sm:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sky-800 font-bold bg-sky-100/80 border border-sky-200/90 px-1.5 py-0.5 rounded text-[11px]">
                SDG 13
              </span>
              <span className="font-semibold text-stone-700">Climate Action</span>
            </div>
          </div>

          {/* Right Side: Clean Vertically Aligned Quote */}
          <div className="text-emerald-900/85 italic text-xs leading-relaxed lg:text-right shrink-0 lg:border-l lg:border-emerald-900/10 lg:pl-4">
            "Don't irrigate because the clock says so. Irrigate because the crop actually needs it."
          </div>
        </div>
      </div>
    </header>
  );
};
