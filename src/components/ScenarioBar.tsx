import React from 'react';
import { Play, Check, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PREDEFINED_SCENARIOS } from '../agents/agentLogic';
import { ScenarioPreset } from '../types/irrigation';

interface ScenarioBarProps {
  onSelectScenario: (scenario: ScenarioPreset) => void;
  selectedId: string | null;
  currentDecision?: string | null;
}

export const ScenarioBar: React.FC<ScenarioBarProps> = ({
  onSelectScenario,
  selectedId,
  currentDecision,
}) => {
  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-bold text-[#0F291E]">
            Evaluation Scenarios (Try Examples)
          </h2>
          <span className="text-xs text-stone-500">· Click to test multi-agent reasoning flow</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {PREDEFINED_SCENARIOS.map((scenario) => {
          const isSelected = selectedId === scenario.id;
          const badgeColor =
            scenario.tag === 'IRRIGATE'
              ? 'text-sky-800 border-sky-300 bg-sky-50'
              : scenario.tag === 'IRRIGATE PARTIALLY'
              ? 'text-amber-800 border-amber-300 bg-amber-50'
              : 'text-emerald-800 border-emerald-300 bg-emerald-50';

          const hasValidation = isSelected && currentDecision;
          const isPassed = hasValidation && currentDecision === scenario.expectedDecision;

          return (
            <div
              key={scenario.id}
              className={`p-3.5 rounded-xl border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600/30'
                  : 'border-stone-200/90 bg-[#FBFDFB] hover:border-emerald-300 hover:bg-emerald-50/30'
              }`}
            >
              <div>
                {/* Active / Loaded Badge */}
                {isSelected && (
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-200/70">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                      ACTIVE SCENARIO
                    </span>
                    {hasValidation && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5 ${
                          isPassed
                            ? 'text-emerald-800 bg-emerald-100'
                            : 'text-amber-800 bg-amber-100'
                        }`}
                      >
                        {isPassed ? (
                          <>
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />
                            Passed
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                            Differs
                          </>
                        )}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xs font-bold text-[#0F291E]">
                    {scenario.inputs.crop} · {scenario.inputs.growthStage}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${badgeColor}`}
                    title={`Expected Decision: ${scenario.expectedDecision}`}
                  >
                    {scenario.tag}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-tight mb-2.5 line-clamp-2">
                  {scenario.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-mono tabular-nums text-stone-700 font-medium">
                  {scenario.inputs.soilMoisture}% soil · {scenario.inputs.rainProbability}% rain
                </span>

                <button
                  onClick={() => onSelectScenario(scenario)}
                  className={`flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'text-emerald-800 bg-emerald-100/90 border border-emerald-300 shadow-2xs'
                      : 'text-emerald-700 hover:bg-emerald-100/60'
                  }`}
                  title="Click to load this scenario into the farm inputs"
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-700" />
                      <span>Loaded</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-emerald-700" />
                      <span>Load</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
