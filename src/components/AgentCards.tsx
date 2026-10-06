import React from 'react';
import {
  Droplets,
  CloudSun,
  Sprout,
  BrainCircuit,
  Power,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gauge
} from 'lucide-react';
import { MultiAgentResult } from '../types/irrigation';

interface AgentCardsProps {
  result: MultiAgentResult;
}

export const AgentCards: React.FC<AgentCardsProps> = ({ result }) => {
  const { soilAgent, weatherAgent, cropAgent, planningAgent, pumpAgent } = result;

  const soilStatusColor =
    soilAgent.status === 'Very Dry'
      ? 'text-rose-800 bg-rose-50 border-rose-300'
      : soilAgent.status === 'Dry'
      ? 'text-amber-800 bg-amber-50 border-amber-300'
      : 'text-emerald-800 bg-emerald-50 border-emerald-300';

  const weatherConditionColor =
    weatherAgent.condition === 'Hot and Dry'
      ? 'text-amber-800 bg-amber-50 border-amber-300'
      : weatherAgent.condition === 'Rain Expected'
      ? 'text-sky-800 bg-sky-50 border-sky-300'
      : 'text-stone-700 bg-stone-100 border-stone-300';

  const cropReqColor =
    cropAgent.level === 'High'
      ? 'text-rose-800 bg-rose-50 border-rose-300'
      : cropAgent.level === 'Moderate'
      ? 'text-amber-800 bg-amber-50 border-amber-300'
      : 'text-emerald-800 bg-emerald-50 border-emerald-300';

  const planningDecisionColor =
    planningAgent.decision === 'IRRIGATE'
      ? 'text-sky-800 bg-sky-50 border-sky-300'
      : planningAgent.decision === 'IRRIGATE PARTIALLY'
      ? 'text-amber-800 bg-amber-50 border-amber-300'
      : 'text-emerald-800 bg-emerald-50 border-emerald-300';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm font-bold text-[#0F291E] flex items-center gap-2">
          <span>Specialized Agent Modules</span>
          <span className="text-xs text-stone-500 font-normal hidden sm:inline">
            (Discrete perception, domain reasoning, and actuator translation)
          </span>
        </h3>
        <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          5 AGENTS SYNCHRONIZED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CARD 1: Soil Moisture Agent */}
        <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F291E]">Soil Moisture Agent</h4>
                  <span className="text-[10px] text-stone-500">Perception Agent · Root Zone</span>
                </div>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${soilStatusColor}`}>
                {soilAgent.status}
              </span>
            </div>

            {/* INPUT -> ANALYSIS -> OUTPUT Chain */}
            <div className="space-y-2.5">
              {/* INPUT */}
              <div className="bg-[#F8FAF8] p-2.5 rounded-xl border border-stone-200/70 text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-stone-500 block text-[10px] font-semibold">INPUT TELEMETRY</span>
                  <span className="text-[#0F291E] font-bold text-sm tabular-nums">
                    {soilAgent.input.soilMoisture}% moisture
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block text-[10px] font-semibold">SCORE SIGNAL</span>
                  <span className="text-sky-800 font-bold text-sm tabular-nums">
                    {soilAgent.scoreContribution > 0 ? `+${soilAgent.scoreContribution}` : '0'} pts
                  </span>
                </div>
              </div>

              {/* ANALYSIS */}
              <div className="space-y-1">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>ANALYSIS</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
                <p className="text-xs text-[#0F291E] leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                  "{soilAgent.analysis}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
            <span>Root Depth: 25–40 cm</span>
            <span className="font-mono text-emerald-800 font-semibold">Confidence: 96%</span>
          </div>
        </div>

        {/* CARD 2: Weather Agent */}
        <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <CloudSun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F291E]">Weather Agent</h4>
                  <span className="text-[10px] text-stone-500">Environmental Agent · Microclimate</span>
                </div>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${weatherConditionColor}`}>
                {weatherAgent.condition}
              </span>
            </div>

            {/* INPUT -> ANALYSIS -> OUTPUT Chain */}
            <div className="space-y-2.5">
              {/* INPUT */}
              <div className="bg-[#F8FAF8] p-2.5 rounded-xl border border-stone-200/70 text-xs font-mono grid grid-cols-3 gap-1">
                <div>
                  <span className="text-stone-500 block text-[10px] font-semibold">TEMP</span>
                  <span className="text-[#0F291E] font-bold tabular-nums">
                    {weatherAgent.input.temperature}°C
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] font-semibold">HUMIDITY</span>
                  <span className="text-[#0F291E] font-bold tabular-nums">
                    {weatherAgent.input.humidity}%
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] font-semibold">RAIN PROB</span>
                  <span className="text-[#0F291E] font-bold tabular-nums">
                    {weatherAgent.input.rainProbability}%
                  </span>
                </div>
              </div>

              {/* ANALYSIS */}
              <div className="space-y-1">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>ANALYSIS</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
                <p className="text-xs text-[#0F291E] leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                  "{weatherAgent.analysis}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
            <span>Evaporative Demand: {weatherAgent.evaporativeDemand}</span>
            <span className="font-mono text-amber-800 font-semibold">
              {weatherAgent.rainScoreContribution < 0 ? `${weatherAgent.rainScoreContribution} rain discount` : 'No discount'}
            </span>
          </div>
        </div>

        {/* CARD 3: Crop Requirement Agent */}
        <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F291E]">Crop Requirement Agent</h4>
                  <span className="text-[10px] text-stone-500">Agronomic Agent · Physiology</span>
                </div>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${cropReqColor}`}>
                {cropAgent.level} REQUIREMENT
              </span>
            </div>

            {/* INPUT -> ANALYSIS -> OUTPUT Chain */}
            <div className="space-y-2.5">
              {/* INPUT */}
              <div className="bg-[#F8FAF8] p-2.5 rounded-xl border border-stone-200/70 text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-stone-500 block text-[10px] font-semibold">CROP & STAGE</span>
                  <span className="text-[#0F291E] font-bold text-xs truncate block">
                    {cropAgent.input.crop} ({cropAgent.input.growthStage})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block text-[10px] font-semibold">WATER INDEX</span>
                  <span className="text-emerald-800 font-bold text-sm tabular-nums">
                    {cropAgent.waterRequirement} (Base {cropAgent.baseRequirement})
                  </span>
                </div>
              </div>

              {/* ANALYSIS */}
              <div className="space-y-1">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>ANALYSIS</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
                <p className="text-xs text-[#0F291E] leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                  "{cropAgent.analysis}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
            <span>Stage: {cropAgent.input.growthStage}</span>
            <span className="font-mono text-emerald-800 font-semibold">+{cropAgent.scoreContribution} pts weight</span>
          </div>
        </div>

        {/* CARD 4: Irrigation Planning Agent (STRONGEST VISUAL EMPHASIS - AI BRAIN) */}
        <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 border-2 border-emerald-600 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-md ring-2 ring-emerald-600/15 md:col-span-2 lg:col-span-2">
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-emerald-200 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-700 to-[#14532D] text-white shadow-sm shadow-emerald-900/20">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-extrabold text-[#0F291E]">
                      Irrigation Planning Agent
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">
                      CENTRAL AI DECISION ENGINE
                    </span>
                  </div>
                  <span className="text-xs text-stone-600">
                    Cross-agent multi-factor synthesis engine
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-emerald-200/80 shadow-2xs">
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 font-mono block font-semibold">AGGREGATE SCORE</span>
                  <span className="text-xl font-mono font-extrabold text-emerald-800 tabular-nums">
                    {planningAgent.decisionScore}
                  </span>
                </div>
                <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border uppercase ${planningDecisionColor}`}>
                  {planningAgent.decision}
                </div>
              </div>
            </div>

            {/* Threshold & Rule Banner */}
            <div className="bg-white p-3 rounded-xl border border-emerald-200/80 mb-3.5 flex items-center justify-between text-xs font-mono shadow-2xs">
              <span className="text-stone-600 font-semibold">Decision Classification:</span>
              <span className="text-emerald-900 font-bold">{planningAgent.thresholdMet}</span>
            </div>

            {/* Multi-factor Reasoning Body */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-emerald-900 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Collaborative Reasoning Process
              </span>
              <p className="text-xs text-[#0F291E] leading-relaxed bg-white/90 p-3.5 rounded-xl border border-emerald-200/70 shadow-2xs">
                {planningAgent.reasoning}
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-emerald-200/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600">
            <span>Inputs synthesized from 3 sensory & agronomic agents</span>
            <span className="font-mono text-emerald-800 font-bold">
              Formula: Soil (+0..+3) + Weather (+0..+2) + Rain (-3..0) + Crop (+0..+2)
            </span>
          </div>
        </div>

        {/* CARD 5: Pump Control Agent */}
        <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all md:col-span-2 lg:col-span-1">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                  <Power className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F291E]">Pump Control Agent</h4>
                  <span className="text-[10px] text-stone-500">Actuator Controller · Solenoid</span>
                </div>
              </div>
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                  pumpAgent.pumpStatus === 'ON'
                    ? 'text-teal-800 bg-teal-50 border-teal-300'
                    : 'text-emerald-800 bg-emerald-50 border-emerald-300'
                }`}
              >
                PUMP {pumpAgent.pumpStatus}
              </span>
            </div>

            {/* Directive */}
            <div className="bg-[#F8FAF8] p-3 rounded-xl border border-stone-200/70 mb-3">
              <span className="text-[10px] text-stone-500 font-mono block mb-0.5 font-bold">DIRECTIVE</span>
              <p className="text-xs font-bold text-[#0F291E]">
                {pumpAgent.action}
              </p>
            </div>

            {/* Actuator Telemetry */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Valve Duty Cycle:</span>
                <span className="text-[#0F291E] font-medium">{pumpAgent.valveDutyCycle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Flow Rate:</span>
                <span className="text-teal-800 font-bold tabular-nums">
                  {pumpAgent.flowRateLitersPerHour.toLocaleString()} L/hr
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Cycle Duration:</span>
                <span className="text-[#0F291E] font-bold tabular-nums">
                  {pumpAgent.recommendedDurationMinutes} minutes
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
            <span>Override Lock: Active</span>
            <span className="font-mono text-teal-800 font-semibold">
              {pumpAgent.pumpStatus === 'OFF' ? 'Energy Saved: 1.8 kWh' : 'Targeted delivery'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
