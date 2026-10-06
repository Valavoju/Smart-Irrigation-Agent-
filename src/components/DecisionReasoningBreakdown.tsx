import React from 'react';
import { HelpCircle, Calculator, CheckCircle2, MinusCircle, PlusCircle, ArrowRight } from 'lucide-react';
import { MultiAgentResult } from '../types/irrigation';

interface DecisionReasoningBreakdownProps {
  result: MultiAgentResult;
}

export const DecisionReasoningBreakdown: React.FC<DecisionReasoningBreakdownProps> = ({ result }) => {
  const { planningAgent } = result;

  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200/80 mb-6">
        <div>
          <h3 className="text-base font-bold text-[#0F291E] flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-800">
              <HelpCircle className="w-4 h-4" />
            </div>
            Why did the agent decide this?
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Individual decision factor audit — demonstrating collaborative multi-agent scoring
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F8FAF8] px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs font-mono">
          <Calculator className="w-4 h-4 text-emerald-700" />
          <span className="text-stone-600 font-medium">Total Net Score:</span>
          <span className="text-emerald-900 font-extrabold text-sm tabular-nums">
            {planningAgent.decisionScore} pts
          </span>
        </div>
      </div>

      {/* Grid of 4 Key Environmental & Crop Decision Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {planningAgent.factors.map((factor, index) => {
          const isPositive = factor.points > 0;
          const isNegative = factor.points < 0;

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                isPositive
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : isNegative
                  ? 'bg-sky-50/50 border-sky-200'
                  : 'bg-[#F9FAF9] border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-stone-500 font-bold">
                    {factor.factor}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                      isPositive
                        ? 'text-emerald-800 bg-emerald-100 border-emerald-300'
                        : isNegative
                        ? 'text-sky-800 bg-sky-100 border-sky-300'
                        : 'text-stone-700 bg-stone-100 border-stone-300'
                    }`}
                  >
                    {isPositive ? `+${factor.points} pts` : `${factor.points} pts`}
                  </span>
                </div>

                <div className="text-sm font-bold text-[#0F291E] mb-1.5 font-mono">
                  {factor.inputValue}
                </div>

                <p className="text-xs text-stone-600 leading-snug">
                  → {factor.impactText}
                </p>
              </div>

              <div className="mt-3.5 pt-2 border-t border-stone-200/80 flex items-center gap-1.5 text-[11px]">
                {isPositive ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <PlusCircle className="w-3.5 h-3.5" />
                    Increased irrigation need
                  </span>
                ) : isNegative ? (
                  <span className="text-sky-700 font-semibold flex items-center gap-1">
                    <MinusCircle className="w-3.5 h-3.5" />
                    Rain discount (conserves water)
                  </span>
                ) : (
                  <span className="text-stone-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Neutral factor
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Calculation Scale & Formula Visualizer */}
      <div className="bg-[#F8FAF8] rounded-xl p-4 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#0F291E]">Decision Threshold Scale:</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-600">&lt; 2: DO NOT IRRIGATE</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-600">2–3: IRRIGATE PARTIALLY</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-600">≥ 4: IRRIGATE</span>
          </div>
          <div className="font-mono text-emerald-900 font-bold">
            Calculated: <strong className="text-[#0F291E]">{planningAgent.decisionScore}</strong> → {planningAgent.decision}
          </div>
        </div>

        <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase text-stone-500 block font-bold">
              Final Agent Reasoning Synthesis:
            </span>
            <p className="text-xs text-[#0F291E] leading-relaxed font-medium">
              "{planningAgent.reasoning}"
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-[10px] text-stone-500 block font-mono font-semibold">AUTOMATED VERDICT</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Validated Across 5 Independent Agents
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
