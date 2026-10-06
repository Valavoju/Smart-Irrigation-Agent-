import React from 'react';
import {
  Droplets,
  CloudSun,
  Sprout,
  BrainCircuit,
  SlidersHorizontal,
  ArrowDown,
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { MultiAgentResult } from '../types/irrigation';

interface AgentPipelineVisualizerProps {
  result: MultiAgentResult | null;
  activeStepIndex: number; // 0 to 5 for animation/highlighting
}

export const AgentPipelineVisualizer: React.FC<AgentPipelineVisualizerProps> = ({
  result,
  activeStepIndex,
}) => {
  const isAgentActive = (step: number) => activeStepIndex >= step;

  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-5">
        <div>
          <h2 className="text-sm font-bold text-[#0F291E] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Multi-Agent Collaboration Architecture
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Distributed perception agents feed the central Planning Agent to govern actuator control
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full font-medium">
          <Workflow className="w-3.5 h-3.5" />
          <span>Observe → Reason → Decide → Act</span>
        </div>
      </div>

      {/* Pipeline Diagram */}
      <div className="relative">
        {/* Tier 1: Environmental & Crop Domain Agents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Agent 1: Soil */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isAgentActive(1)
                ? 'border-sky-400 bg-sky-50/50 shadow-sm ring-1 ring-sky-400/40'
                : 'border-stone-200 bg-[#FAFCFA] opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                  <Droplets className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-[#0F291E]">1. Soil Moisture Agent</span>
              </div>
              <span className="text-[10px] font-mono text-sky-800 bg-sky-100/70 border border-sky-200 px-2 py-0.5 rounded-full font-bold">
                {result ? result.soilAgent.status : 'PENDING'}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
              Volumetric root sensor telemetry analysis. Evaluates permanent wilting threshold.
            </p>
            {result && (
              <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Signal:</span>
                <span className="font-mono text-[#0F291E] font-bold">
                  {result.inputs.soilMoisture}% → {result.soilAgent.scoreContribution > 0 ? `+${result.soilAgent.scoreContribution} pts` : '0 pts'}
                </span>
              </div>
            )}
          </div>

          {/* Agent 2: Weather */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isAgentActive(2)
                ? 'border-amber-400 bg-amber-50/50 shadow-sm ring-1 ring-amber-400/40'
                : 'border-stone-200 bg-[#FAFCFA] opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                  <CloudSun className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-[#0F291E]">2. Weather Agent</span>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                {result ? result.weatherAgent.condition : 'PENDING'}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
              Analyzes microclimate temperature, vapor pressure deficit, and rainfall likelihood.
            </p>
            {result && (
              <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Signal:</span>
                <span className="font-mono text-[#0F291E] font-bold">
                  {result.weatherAgent.weatherScoreContribution > 0 ? `+${result.weatherAgent.weatherScoreContribution}` : '0'} weather,{' '}
                  {result.weatherAgent.rainScoreContribution < 0 ? `${result.weatherAgent.rainScoreContribution}` : '0'} rain pts
                </span>
              </div>
            )}
          </div>

          {/* Agent 3: Crop */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isAgentActive(3)
                ? 'border-emerald-400 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-400/40'
                : 'border-stone-200 bg-[#FAFCFA] opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Sprout className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-[#0F291E]">3. Crop Requirement Agent</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                {result ? `INDEX ${result.cropAgent.waterRequirement}` : 'PENDING'}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
              Crop species crop-coefficient (Kc) & physiological growth phase water demand.
            </p>
            {result && (
              <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Signal:</span>
                <span className="font-mono text-[#0F291E] font-bold">
                  {result.cropAgent.level} demand → +{result.cropAgent.scoreContribution} pts
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Downward Conduit with animated pulse */}
        <div className="py-2.5 flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span className="w-16 h-px bg-stone-300" />
            <span className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/80">
              <ArrowDown className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
              Signals Aggregated Into Decision Engine
            </span>
            <span className="w-16 h-px bg-stone-300" />
          </div>
        </div>

        {/* Tier 2: Central Planning Agent (EMPHASIZED AS THE AI BRAIN) */}
        <div
          className={`p-5 rounded-2xl border-2 transition-all ${
            isAgentActive(4)
              ? 'border-emerald-600 bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/80 shadow-md ring-2 ring-emerald-600/20'
              : 'border-stone-300 bg-white opacity-70'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-700 to-[#14532D] text-white shadow-sm shadow-emerald-900/20">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-extrabold text-[#0F291E]">
                    4. Irrigation Planning Agent (Central Synthesizer)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    AI DECISION ENGINE
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  Weighs soil deficit against weather evapotranspiration, rain discount, and crop vulnerability
                </p>
              </div>
            </div>

            {result && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-emerald-200/80 shadow-2xs">
                <div className="text-right">
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                    Net Score
                  </div>
                  <div className="text-base font-bold font-mono text-emerald-800 tabular-nums">
                    {result.planningAgent.decisionScore} pts
                  </div>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border ${
                    result.planningAgent.decision === 'IRRIGATE'
                      ? 'border-sky-300 text-sky-800 bg-sky-50'
                      : result.planningAgent.decision === 'IRRIGATE PARTIALLY'
                      ? 'border-amber-300 text-amber-800 bg-amber-50'
                      : 'border-emerald-300 text-emerald-800 bg-emerald-50'
                  }`}
                >
                  {result.planningAgent.decision}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conduit to Actuator */}
        <div className="py-2.5 flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span className="w-16 h-px bg-stone-300" />
            <span className="flex items-center gap-1.5 text-teal-800 font-bold bg-teal-50 px-3 py-0.5 rounded-full border border-teal-200/80">
              <ArrowDown className="w-3.5 h-3.5 text-teal-600" />
              Direct Policy Translation to Physical Actuator
            </span>
            <span className="w-16 h-px bg-stone-300" />
          </div>
        </div>

        {/* Tier 3: Pump Control Agent */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isAgentActive(5)
              ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500/30'
              : 'border-stone-200 bg-[#FAFCFA] opacity-70'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#0F291E]">5. Pump Control Agent</span>
                <span className="text-stone-500 text-xs ml-2">
                  (Physical solenoid valve and electric motor controller)
                </span>
              </div>
            </div>
            {result && (
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                  result.pumpAgent.pumpStatus === 'ON'
                    ? 'border-teal-300 text-teal-800 bg-teal-50'
                    : 'border-emerald-300 text-emerald-800 bg-emerald-50'
                }`}
              >
                PUMP {result.pumpAgent.pumpStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
