import React from 'react';
import { Droplets, Power, ShieldAlert, Sparkles, CheckCircle2, Clock, Check } from 'lucide-react';
import { MultiAgentResult } from '../types/irrigation';

interface FinalDecisionCardProps {
  result: MultiAgentResult;
  onOpenReport?: () => void;
  onDownloadReport?: () => void;
}

export const FinalDecisionCard: React.FC<FinalDecisionCardProps> = ({
  result,
  onOpenReport,
  onDownloadReport,
}) => {
  const { planningAgent, pumpAgent, conservation, inputs } = result;
  const isIrrigate = planningAgent.decision === 'IRRIGATE';
  const isPartial = planningAgent.decision === 'IRRIGATE PARTIALLY';
  const isDelay = planningAgent.decision === 'DO NOT IRRIGATE';

  const cardTheme = isIrrigate
    ? {
        border: 'border-sky-300',
        bg: 'bg-gradient-to-br from-sky-50 via-white to-emerald-50/50',
        badge: 'text-sky-800 bg-sky-100 border-sky-300',
        iconBg: 'bg-sky-600 text-white',
        textColor: 'text-sky-800',
        accentGlow: 'shadow-sky-900/5',
      }
    : isPartial
    ? {
        border: 'border-amber-300',
        bg: 'bg-gradient-to-br from-amber-50 via-white to-emerald-50/50',
        badge: 'text-amber-800 bg-amber-100 border-amber-300',
        iconBg: 'bg-amber-600 text-white',
        textColor: 'text-amber-800',
        accentGlow: 'shadow-amber-900/5',
      }
    : {
        border: 'border-emerald-300',
        bg: 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/50',
        badge: 'text-emerald-800 bg-emerald-100 border-emerald-300',
        iconBg: 'bg-emerald-600 text-white',
        textColor: 'text-emerald-800',
        accentGlow: 'shadow-emerald-900/5',
      };

  return (
    <div
      className={`border-2 ${cardTheme.border} ${cardTheme.bg} rounded-2xl p-6 sm:p-8 shadow-sm ${cardTheme.accentGlow} relative overflow-hidden`}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Main Verdict & Reasoning */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono tracking-wider uppercase text-stone-500 font-bold">
              Final System Output · Irrigation Decision
            </span>
            <span
              className={`text-xs font-mono px-3 py-0.5 rounded-full border font-bold ${cardTheme.badge}`}
            >
              PUMP {pumpAgent.pumpStatus}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl ${cardTheme.iconBg} shadow-sm shrink-0`}>
              <Droplets className="w-8 h-8 fill-white/20" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F291E] tracking-tight">
                {planningAgent.decision}
              </h2>
              <p className={`text-sm font-bold ${cardTheme.textColor} mt-0.5`}>
                {pumpAgent.action}
              </p>
            </div>
          </div>

          {/* Core Reasoning Statement */}
          <div className="bg-white/90 border border-stone-200/90 rounded-xl p-4 shadow-2xs space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
              Agent Consensus Reasoning:
            </span>
            <p className="text-sm text-[#0F291E] leading-relaxed font-medium">
              {planningAgent.reasoning}
            </p>
          </div>

          {/* Quick summary points */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Target: {inputs.crop} ({inputs.growthStage})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Moisture: {inputs.soilMoisture}%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rain Outlook: {inputs.rainProbability}%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aggregate Score: {planningAgent.decisionScore} pts</span>
            </span>
          </div>
        </div>

        {/* Action Metrics & Water Impact Column */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shrink-0 w-full md:w-76 flex flex-col justify-between space-y-4 shadow-2xs">
          <div>
            <span className="text-xs font-mono text-stone-500 block mb-2 font-bold">
              ACTUATOR SCHEDULING
            </span>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Pump State:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    pumpAgent.pumpStatus === 'ON' ? 'text-sky-800 bg-sky-50' : 'text-emerald-800 bg-emerald-50'
                  }`}
                >
                  {pumpAgent.pumpStatus}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Cycle Duration:</span>
                <span className="text-[#0F291E] font-bold tabular-nums">
                  {pumpAgent.recommendedDurationMinutes} mins
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Water Volume:</span>
                <span className="text-[#0F291E] font-bold tabular-nums">
                  {pumpAgent.estimatedWaterUsageLiters.toLocaleString()} L
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">Water Conserved:</span>
                <span className="text-emerald-700 font-bold tabular-nums">
                  {pumpAgent.estimatedWaterSavedLiters > 0
                    ? `+${pumpAgent.estimatedWaterSavedLiters.toLocaleString()} L`
                    : '0 L (Optimal)'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-600 leading-tight space-y-3">
            {isDelay ? (
              <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Natural precipitation or adequate soil reserves preserve reservoir storage.
              </span>
            ) : isPartial ? (
              <span className="text-amber-900 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                Deficit pulse balances crop hydraulic conduct with water thrift.
              </span>
            ) : (
              <span className="text-sky-900 font-medium flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                Safeguards stomatal conductance and prevents drought yield crash.
              </span>
            )}

            {/* Quick Action Button for One-Page Report */}
            {(onDownloadReport || onOpenReport) && (
              <div className="pt-2 flex flex-col gap-1.5">
                {onDownloadReport && (
                  <button
                    onClick={onDownloadReport}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-700 to-[#14532D] hover:from-emerald-800 hover:to-[#0F3822] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>📄 DOWNLOAD ONE-PAGE REPORT</span>
                  </button>
                )}
                {onOpenReport && (
                  <button
                    onClick={onOpenReport}
                    className="w-full py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#0F291E] font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Preview Full Report Sheet</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
