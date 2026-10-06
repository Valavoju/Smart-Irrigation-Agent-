import React from 'react';
import {
  X,
  FileDown,
  Printer,
  CheckCircle2,
  Droplets,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MultiAgentResult } from '../types/irrigation';
import { generateOnePagePdfReport } from '../utils/generatePdfReport';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MultiAgentResult;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  const { inputs, soilAgent, weatherAgent, cropAgent, planningAgent, pumpAgent, conservation } = result;

  const handleDownload = () => {
    generateOnePagePdfReport(result);
  };

  const handlePrint = () => {
    window.print();
  };

  const decisionBadgeColor =
    planningAgent.decision === 'IRRIGATE'
      ? 'text-sky-800 bg-sky-50 border-sky-300'
      : planningAgent.decision === 'IRRIGATE PARTIALLY'
      ? 'text-amber-800 bg-amber-50 border-amber-300'
      : 'text-emerald-800 bg-emerald-50 border-emerald-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 bg-[#F9FAF9]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-[#14532D] flex items-center justify-center text-white shadow-xs">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F291E]">
                One-Page Agricultural Assessment Report Preview
              </h2>
              <p className="text-xs text-stone-500">
                Official AI multi-agent assessment · Formatted for single-page export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-700 to-[#14532D] hover:from-emerald-800 hover:to-[#0F3822] text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>DOWNLOAD ONE-PAGE REPORT</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-[#0F291E] hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Document Preview Sheet */}
        <div className="p-6 overflow-y-auto bg-stone-100/60 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5 text-[#0F291E]">
            {/* 1. Header Banner */}
            <div className="bg-[#0F3822] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-300 font-bold block">
                  Autonomous Decision Support
                </span>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  SMART IRRIGATION AGENT
                </h1>
                <p className="text-xs text-emerald-100/80">
                  Agentic AI Agricultural Water Assessment Report
                </p>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="inline-block bg-white text-[#0F3822] font-bold font-mono text-[10px] px-2.5 py-0.5 rounded-full mb-1">
                  STATUS: COMPLETED
                </span>
                <div className="text-[11px] text-emerald-200/90 font-mono">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} · {result.timestamp}
                </div>
              </div>
            </div>

            {/* 2. Multi-Agent Pipeline Strip */}
            <div className="bg-[#F2F8F3] border border-stone-200 rounded-lg p-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-emerald-900 font-mono text-[11px]">
                MULTI-AGENT DECISION PIPELINE:
              </span>
              <span className="text-stone-700 font-mono text-[11px] flex items-center gap-1 flex-wrap">
                <span>SOIL AGENT</span> → <span>WEATHER AGENT</span> → <span>CROP AGENT</span> → <span>AI PLANNING</span> → <span>PUMP ACTION</span>
              </span>
            </div>

            {/* 3. Section A: Farm / Input Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono uppercase text-emerald-900 tracking-wider">
                A. Farm Conditions & Sensor Inputs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200">
                  <span className="text-[10px] text-stone-500 block font-bold">CROP</span>
                  <span className="font-bold text-[#0F291E]">{inputs.crop}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200">
                  <span className="text-[10px] text-stone-500 block font-bold">GROWTH STAGE</span>
                  <span className="font-bold text-[#0F291E]">{inputs.growthStage}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200">
                  <span className="text-[10px] text-stone-500 block font-bold">SOIL MOISTURE</span>
                  <span className="font-bold text-[#0F291E] font-mono">{inputs.soilMoisture}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200">
                  <span className="text-[10px] text-stone-500 block font-bold">TEMPERATURE</span>
                  <span className="font-bold text-[#0F291E] font-mono">{inputs.temperature}°C</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200">
                  <span className="text-[10px] text-stone-500 block font-bold">HUMIDITY</span>
                  <span className="font-bold text-[#0F291E] font-mono">{inputs.humidity}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200">
                  <span className="text-[10px] text-stone-500 block font-bold">RAIN PROB</span>
                  <span className="font-bold text-[#0F291E] font-mono">{inputs.rainProbability}%</span>
                </div>
              </div>
            </div>

            {/* 4. Section B: Multi-Agent Analysis Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono uppercase text-emerald-900 tracking-wider">
                B. Multi-Agent Analysis Summary
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-emerald-950 font-bold mr-2">1. Soil Moisture Agent:</strong>
                    <span className="font-mono font-bold text-emerald-800">{soilAgent.status}</span>
                    <span className="text-stone-600 block sm:inline sm:ml-2">"{soilAgent.analysis}"</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0">
                    {soilAgent.scoreContribution > 0 ? `+${soilAgent.scoreContribution} pts` : '0 pts'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-emerald-950 font-bold mr-2">2. Weather Agent:</strong>
                    <span className="font-mono font-bold text-amber-800">{weatherAgent.condition}</span>
                    <span className="text-stone-600 block sm:inline sm:ml-2">"{weatherAgent.analysis}"</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0">
                    {weatherAgent.rainScoreContribution < 0 ? `${weatherAgent.rainScoreContribution} rain discount` : '0 pts'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-emerald-950 font-bold mr-2">3. Crop Requirement Agent:</strong>
                    <span className="font-mono font-bold text-emerald-800">{cropAgent.level} (Index {cropAgent.waterRequirement})</span>
                    <span className="text-stone-600 block sm:inline sm:ml-2">"{cropAgent.analysis}"</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0">
                    +{cropAgent.scoreContribution} pts
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-emerald-950 font-bold mr-2">4. Irrigation Planning Agent:</strong>
                    <span className="font-mono font-bold text-purple-900">{planningAgent.decision} (Net Score: {planningAgent.decisionScore})</span>
                    <span className="text-stone-600 block sm:inline sm:ml-2">{planningAgent.thresholdMet}</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-700 font-bold shrink-0">
                    {planningAgent.decisionScore} pts
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-emerald-950 font-bold mr-2">5. Pump Control Agent:</strong>
                    <span className="font-mono font-bold text-teal-800">PUMP {pumpAgent.pumpStatus}</span>
                    <span className="text-stone-600 block sm:inline sm:ml-2">"{pumpAgent.action}" (Duty cycle: {pumpAgent.valveDutyCycle})</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0">
                    {pumpAgent.flowRateLitersPerHour.toLocaleString()} L/hr
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Section C: Final Irrigation Decision */}
            <div className="p-4 sm:p-5 rounded-xl border-2 border-emerald-600 bg-[#F4F9F5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-stone-500">
                  C. FINAL IRRIGATION DECISION
                </span>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${decisionBadgeColor}`}>
                  {planningAgent.decision}
                </span>
              </div>

              <div className="text-base sm:text-lg font-extrabold text-[#0F291E]">
                {pumpAgent.action}
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                <strong>Decision Reason:</strong> {planningAgent.reasoning}
              </p>

              <div className="pt-2 border-t border-emerald-200/80 flex flex-wrap items-center justify-between text-xs font-mono text-stone-600">
                <span>Recommended Run Time: <strong>{pumpAgent.recommendedDurationMinutes} minutes</strong></span>
                <span>Water Volume: <strong>{pumpAgent.estimatedWaterUsageLiters.toLocaleString()} L</strong></span>
                <span className="text-emerald-800 font-bold">
                  Conserved: +{pumpAgent.estimatedWaterSavedLiters.toLocaleString()} L
                </span>
              </div>
            </div>

            {/* 6. Section D: Water Conservation Recommendation */}
            <div className="p-4 rounded-xl bg-[#F8FAF8] border border-stone-200 space-y-1 text-xs">
              <h3 className="font-bold font-mono uppercase text-emerald-900 tracking-wider">
                D. Water Conservation Recommendation
              </h3>
              <p className="font-bold text-emerald-800">
                {conservation.headline}
              </p>
              <p className="text-stone-700 leading-relaxed font-medium">
                {conservation.explanation}
              </p>
            </div>

            {/* 7. Footer & SDGs & Disclaimer */}
            <div className="pt-3 border-t border-stone-200 text-[11px] space-y-1 text-stone-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-[#0F291E]">
                <span>Smart Irrigation Agent · Agentic AI for Intelligent Water Conservation in Agriculture</span>
                <span className="text-emerald-700">SDG 6 · SDG 2 · SDG 12 · SDG 13</span>
              </div>
              <p className="text-[10px] text-stone-400 italic">
                Disclaimer: This prototype provides an AI-assisted irrigation recommendation based on the supplied agricultural conditions. Actual irrigation decisions should consider field-specific measurements and professional agricultural guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#F9FAF9] flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Export Format: One-Page Publication PDF (A4)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-700 to-[#14532D] text-white hover:from-emerald-800 hover:to-[#0F3822] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>DOWNLOAD PDF REPORT</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-[#0F291E] font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
