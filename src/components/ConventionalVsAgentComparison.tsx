import React from 'react';
import { XCircle, CheckCircle2, Clock, BrainCircuit, Droplets, Zap, ShieldAlert, Sparkles } from 'lucide-react';

export const ConventionalVsAgentComparison: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero comparison header */}
      <div className="bg-white border border-emerald-900/10 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase text-emerald-800 font-bold tracking-wider">
            Paradigm Shift in Agricultural Water Management
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F291E] mt-1 mb-2">
            Conventional Timer vs Smart Agentic AI
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-medium">
            Conventional irrigation relies on mechanical or electronic timers that operate blindly regardless of rain, current soil saturation, or crop reproductive stage. The Smart Irrigation Agent replaces this with collaborative, multi-factor autonomous reasoning.
          </p>
        </div>
      </div>

      {/* Side-by-side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conventional Timer System */}
        <div className="bg-white border border-rose-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F291E]">Conventional Timer System</h3>
                  <span className="text-xs text-rose-700 font-mono font-semibold">Rigid Clock Schedule</span>
                </div>
              </div>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>

            <ul className="space-y-3.5 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Blind to incoming rainfall</strong>
                  Irrigates even if 80% rain is forecast in 2 hours, saturating topsoil and causing nutrient leaching.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Ignores actual soil moisture</strong>
                  Waters saturated soil when moisture is already &gt; 65%, risking root rot and fungal damping-off.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Static crop water allocation</strong>
                  Applies the exact same water volume during low-demand vegetative stages as critical flowering stages.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Excessive electrical and pump wear</strong>
                  Pumps water 365 days a year without reason, wasting 35%–50% of pumped agricultural volume.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-100 bg-rose-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between font-mono text-xs">
            <span className="text-rose-800 font-semibold">Est. Annual Water Wasted:</span>
            <span className="text-rose-700 font-bold text-sm">~450,000 L / ha</span>
          </div>
        </div>

        {/* Smart Agentic AI */}
        <div className="bg-white border-2 border-emerald-600 rounded-2xl p-6 flex flex-col justify-between shadow-sm ring-2 ring-emerald-600/15">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-emerald-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-700 to-[#14532D] text-white">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F291E]">Smart Irrigation Agent</h3>
                  <span className="text-xs text-emerald-800 font-mono font-bold">Agentic Multi-Factor AI</span>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <ul className="space-y-3.5 text-xs text-stone-700 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Precipitation predictive discounting</strong>
                  Weather Agent tracks rain probabilities &ge; 70% and automatically pauses pump actuation.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Volumetric root zone sensing</strong>
                  Soil Agent measures moisture thresholds (&lt; 30%, 30–49%, &ge; 50%) to ensure roots stay in optimal field capacity.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Dynamic crop phenology reasoning</strong>
                  Crop Requirement Agent boosts water supply during critical flowering phases (+10 pts) and dials down during maturity.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F291E] block font-bold">Targeted partial pulsed delivery</strong>
                  Pump Control Agent switches between Full, Partial (pulsed micro-sprinkler), or OFF state.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-100 bg-emerald-50/80 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between font-mono text-xs">
            <span className="text-emerald-900 font-bold">Est. Average Water Savings:</span>
            <span className="text-emerald-700 font-bold text-sm">38% – 52% per season</span>
          </div>
        </div>
      </div>

      {/* Concrete Real World Field Example */}
      <div className="bg-white border border-emerald-900/10 rounded-2xl p-6 shadow-xs">
        <h4 className="text-xs font-mono uppercase text-stone-500 mb-3 font-bold">
          Real Scenario Comparison: Tomato Farm in Monsoon Season
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#FAF8F8] p-4 rounded-xl border border-rose-200/80">
            <span className="text-rose-800 font-bold block mb-1">Timer Schedule (6:00 AM Daily)</span>
            <p className="text-stone-600 leading-relaxed">
              Pump triggers at 6:00 AM, dumping 4,500 L on soil that is already 60% wet. At 8:30 AM, heavy thunderstorm arrives (35mm rain). The soil is oversaturated, roots suffer oxygen starvation, and fertilizer washes away into local streams.
            </p>
          </div>
          <div className="bg-[#F8FAF8] p-4 rounded-xl border border-emerald-200/80">
            <span className="text-emerald-900 font-bold block mb-1">Smart Irrigation Agent</span>
            <p className="text-stone-600 leading-relaxed">
              At 5:50 AM, Weather Agent flags 85% rain probability; Soil Agent reports 60% moisture. Irrigation Planning Agent calculates Score -2 &rarr; DO NOT IRRIGATE. Pump remains OFF, saving 4,500 L and preserving natural plant health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
