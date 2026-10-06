import React from 'react';
import { CheckCircle2, Loader2, Sparkles, Droplets, CloudSun, Sprout, BrainCircuit, SlidersHorizontal, FileText, Check } from 'lucide-react';

interface AnalysisProcessingModalProps {
  isOpen: boolean;
  activeStepIndex: number; // 0 to 6
  onFinish?: () => void;
}

interface StepItem {
  name: string;
  sub: string;
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    name: 'Soil Moisture Agent',
    sub: 'Analyzing root zone moisture & physiological wilting point...',
    icon: <Droplets className="w-4 h-4 text-sky-600" />,
  },
  {
    name: 'Weather Agent',
    sub: 'Evaluating ambient thermal load, humidity & rain prediction...',
    icon: <CloudSun className="w-4 h-4 text-amber-600" />,
  },
  {
    name: 'Crop Requirement Agent',
    sub: 'Calculating crop coefficient (Kc) & flowering stage demand...',
    icon: <Sprout className="w-4 h-4 text-emerald-600" />,
  },
  {
    name: 'Irrigation Planning Agent',
    sub: 'Reasoning over multi-factor trade-offs & computing net score...',
    icon: <BrainCircuit className="w-4 h-4 text-purple-600" />,
  },
  {
    name: 'Pump Control Agent',
    sub: 'Determining recommended action, valve duty cycle & runtime...',
    icon: <SlidersHorizontal className="w-4 h-4 text-teal-600" />,
  },
  {
    name: 'Water Conservation Engine',
    sub: 'Computing volumetric freshwater savings & SDG impact metrics...',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
  },
  {
    name: 'Final Report Generation',
    sub: 'Compiling one-page assessment report...',
    icon: <FileText className="w-4 h-4 text-emerald-700" />,
  },
];

export const AnalysisProcessingModal: React.FC<AnalysisProcessingModalProps> = ({
  isOpen,
  activeStepIndex,
}) => {
  if (!isOpen) return null;

  const isComplete = activeStepIndex >= STEPS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 mx-auto flex items-center justify-center text-emerald-800 shadow-2xs mb-2">
            {isComplete ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            ) : (
              <Loader2 className="w-7 h-7 text-emerald-700 animate-spin" />
            )}
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#0F291E] tracking-tight">
            {isComplete ? 'ANALYSIS COMPLETE' : 'ANALYZING FARM CONDITIONS...'}
          </h2>
          <p className="text-xs text-stone-500">
            {isComplete
              ? 'Multi-agent consensus achieved. Ready to inspect results and export report.'
              : 'Executing real-time multi-agent decision pipeline in sequence.'}
          </p>
        </div>

        {/* Step-by-Step Agent Processing Checklist */}
        <div className="space-y-2.5">
          {STEPS.map((step, idx) => {
            const isDone = activeStepIndex > idx;
            const isCurrent = activeStepIndex === idx;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isDone
                    ? 'bg-[#F4F9F5] border-emerald-200 text-[#0F291E]'
                    : isCurrent
                    ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20'
                    : 'bg-stone-50 border-stone-200/80 text-stone-400 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-stone-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{step.name}</span>
                    {isDone && (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 rounded">
                        DONE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug truncate">
                    {step.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress status */}
        <div className="text-center pt-1 text-xs font-mono text-stone-500">
          <span>
            {Math.min(activeStepIndex, STEPS.length)} of {STEPS.length} Agents Completed
          </span>
        </div>
      </div>
    </div>
  );
};
