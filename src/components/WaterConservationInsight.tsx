import React from 'react';
import { Droplets, Globe, Zap, ShieldCheck, HeartHandshake, TreePine, Waves, CheckCircle2 } from 'lucide-react';
import { MultiAgentResult } from '../types/irrigation';

interface WaterConservationInsightProps {
  result: MultiAgentResult;
}

export const WaterConservationInsight: React.FC<WaterConservationInsightProps> = ({ result }) => {
  const { conservation, pumpAgent, inputs } = result;
  const fieldHa = inputs.fieldSizeHectares ?? 1.0;
  const isAvoided = result.planningAgent.decision === 'DO NOT IRRIGATE';
  const isPartial = result.planningAgent.decision === 'IRRIGATE PARTIALLY';

  // Typical timer schedule runs 4,500 L / ha blindly
  const conventionalTimerLiters = Math.round(4500 * fieldHa);
  const actualAgentLiters = pumpAgent.estimatedWaterUsageLiters;
  const litersSaved = Math.max(0, conventionalTimerLiters - actualAgentLiters);
  const kwhSaved = Math.round((litersSaved / 1000) * 0.45 * 10) / 10; // ~0.45 kWh per m³ pumped
  const savingsPercent = conventionalTimerLiters > 0 ? Math.round((litersSaved / conventionalTimerLiters) * 100) : 0;

  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl p-6 shadow-xs relative overflow-hidden">
      {/* Subtle water-wave background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-100/40 via-teal-50/20 to-transparent rounded-full -mr-32 -mt-32 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 text-white shadow-sm shadow-sky-900/15">
            <Droplets className="w-6 h-6 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0F291E]">
                Water Conservation & SDG Impact Insight
              </h3>
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                💧 Water is being conserved intelligently
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Sustainability footprint & comparative resource efficiency for {fieldHa} hectare field
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-800 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SDG 6 CERTIFIED</span>
        </div>
      </div>

      {/* Primary Insight Banner */}
      <div className="relative z-10 bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/90 border border-emerald-200/80 rounded-xl p-4 mb-6 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h4 className="text-sm font-bold text-[#0F291E]">
            {conservation.headline}
          </h4>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed font-medium">
          {conservation.explanation}
        </p>
      </div>

      {/* Water Level / Conservation Gauge Strip */}
      <div className="relative z-10 bg-[#F8FAF8] border border-stone-200/90 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-[#0F291E] flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-sky-600" />
            Relative Conservation Efficiency vs Blind Daily Timer
          </span>
          <span className="font-mono font-bold text-emerald-800">
            {savingsPercent}% Water Saved
          </span>
        </div>
        <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(8, savingsPercent)}%` }}
          />
        </div>
      </div>

      {/* Real-time Comparative Savings Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Metric 1: Water Conserved */}
        <div className="bg-[#FAFDFB] border border-emerald-100 p-4 rounded-xl flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 block mb-1 font-bold">
              Water Conserved This Cycle
            </span>
            <div className="text-2xl font-extrabold font-mono text-emerald-700 tabular-nums">
              {litersSaved > 0 ? `+${litersSaved.toLocaleString()} L` : '0 L (Essential)'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {litersSaved > 0
                ? `Saved compared to rigid daily timer schedule on ${fieldHa} ha.`
                : 'Full allocation supplied to protect crop from irreversible drought stress.'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200/80 text-[10px] text-stone-500 font-mono">
            Metric: Volumetric Freshwater Preservation
          </div>
        </div>

        {/* Metric 2: Electricity & Carbon Avoided */}
        <div className="bg-[#FAFDFB] border border-emerald-100 p-4 rounded-xl flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 block mb-1 font-bold">
              Energy & Pump Wear Prevented
            </span>
            <div className="text-2xl font-extrabold font-mono text-amber-700 tabular-nums">
              {kwhSaved > 0 ? `~${kwhSaved} kWh` : '0 kWh'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              Avoids idle pump motor cycling, reducing greenhouse gas emissions and electrical grid draw.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200/80 text-[10px] text-stone-500 font-mono">
            Metric: Carbon & Grid Efficiency (SDG 13)
          </div>
        </div>

        {/* Metric 3: Root Health & Soil Protection */}
        <div className="bg-[#FAFDFB] border border-emerald-100 p-4 rounded-xl flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 block mb-1 font-bold">
              Agronomic Soil Protection
            </span>
            <div className="text-lg font-bold text-[#0F291E]">
              {isAvoided
                ? 'Zero Leaching & Hypoxia'
                : isPartial
                ? 'Optimized Aeration'
                : 'Active Wilting Prevention'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {isAvoided
                ? 'Prevents root suffocation from waterlogging when rain arrives.'
                : isPartial
                ? 'Maintains aerobic microbial microbiome in the root collar.'
                : 'Provides vital water volume before plant cells undergo plasmolysis.'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200/80 text-[10px] text-stone-500 font-mono">
            Metric: Soil & Yield Safeguard (SDG 2)
          </div>
        </div>
      </div>

      {/* Sustainable Development Goals Alignment Cards */}
      <div className="relative z-10">
        <h4 className="text-xs font-mono uppercase text-stone-500 tracking-wider mb-3 font-bold">
          United Nations Sustainable Development Goals (SDG) Alignment:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-stone-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              SDG 6: Clean Water
            </div>
            <p className="text-stone-600 text-[11px] leading-tight">
              Combats aquifer depletion by ending obsolete clock-based over-irrigation.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-stone-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              SDG 2: Zero Hunger
            </div>
            <p className="text-stone-600 text-[11px] leading-tight">
              Stabilizes crop harvests and ensures plants receive optimal root hydration.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-stone-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-teal-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              SDG 12: Responsible Production
            </div>
            <p className="text-stone-600 text-[11px] leading-tight">
              Encourages circular precision agriculture with minimal input waste.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-stone-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-sky-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              SDG 13: Climate Action
            </div>
            <p className="text-stone-600 text-[11px] leading-tight">
              Strengthens rural resilience against erratic monsoon shifts and heat spikes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
