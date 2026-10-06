import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Sun, Moon, CloudLightning, Droplets, Sparkles } from 'lucide-react';
import { FarmInputs, MultiAgentResult } from '../types/irrigation';
import { executeMultiAgentSystem } from '../agents/agentLogic';

interface DiurnalStep {
  time: string;
  label: string;
  icon: 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';
  inputs: FarmInputs;
  expectedDecision: string;
  notes: string;
}

const DIURNAL_STEPS: DiurnalStep[] = [
  {
    time: '06:00 AM',
    label: 'Early Dawn / Dew Layer',
    icon: 'morning',
    inputs: {
      crop: 'Rice',
      growthStage: 'Flowering',
      soilMoisture: 48,
      temperature: 22,
      humidity: 82,
      rainProbability: 15,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'DO NOT IRRIGATE',
    notes: 'High ambient humidity (82%) from overnight dew; low evaporative demand. Irrigation deferred to conserve water.',
  },
  {
    time: '11:00 AM',
    label: 'Midday Solar Heat Ramp',
    icon: 'noon',
    inputs: {
      crop: 'Rice',
      growthStage: 'Flowering',
      soilMoisture: 38,
      temperature: 34,
      humidity: 45,
      rainProbability: 20,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'IRRIGATE PARTIALLY',
    notes: 'Soil drops to 38% (dry), temperature warms up. Moderate deficit triggers controlled pulse irrigation.',
  },
  {
    time: '02:30 PM',
    label: 'Peak Afternoon Heatwave Spike',
    icon: 'afternoon',
    inputs: {
      crop: 'Rice',
      growthStage: 'Flowering',
      soilMoisture: 26,
      temperature: 39,
      humidity: 28,
      rainProbability: 10,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'IRRIGATE',
    notes: 'Critically dry soil (26%) + Hot & Dry condition (39°C, 28% RH) + High flowering demand (90 index). Full pump cycle triggered to save harvest.',
  },
  {
    time: '06:00 PM',
    label: 'Approaching Thunderstorm Clouds',
    icon: 'evening',
    inputs: {
      crop: 'Rice',
      growthStage: 'Flowering',
      soilMoisture: 42,
      temperature: 29,
      humidity: 78,
      rainProbability: 85,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'DO NOT IRRIGATE',
    notes: 'Rain probability shoots up to 85% (-3 pts discount). Smart Agent immediately commands pump OFF, saving thousands of liters before rainfall.',
  },
  {
    time: '10:00 PM',
    label: 'Post-Rain Night Saturation',
    icon: 'night',
    inputs: {
      crop: 'Rice',
      growthStage: 'Flowering',
      soilMoisture: 72,
      temperature: 24,
      humidity: 90,
      rainProbability: 10,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'DO NOT IRRIGATE',
    notes: 'Soil naturally replenished to 72% (Sufficient). Pump safely locked OFF. Zero electrical grid draw overnight.',
  },
];

interface AgroDiurnalSimulatorProps {
  onApplyStep: (inputs: FarmInputs) => void;
}

export const AgroDiurnalSimulator: React.FC<AgroDiurnalSimulatorProps> = ({ onApplyStep }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = DIURNAL_STEPS[currentStepIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          const next = (prev + 1) % DIURNAL_STEPS.length;
          onApplyStep(DIURNAL_STEPS[next].inputs);
          return next;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, onApplyStep]);

  const handleStepSelect = (index: number) => {
    setCurrentStepIndex(index);
    onApplyStep(DIURNAL_STEPS[index].inputs);
  };

  const currentStepResult = executeMultiAgentSystem(currentStep.inputs);

  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0F291E]">
              24-Hour Diurnal Climate Simulator
            </h3>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-bold">
              DYNAMIC ADAPTATION
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Observe how the 5 agents dynamically adapt throughout changing day/night conditions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-emerald-700 text-white hover:bg-emerald-800'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Auto-Run</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play 24h Cycle</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              handleStepSelect(0);
            }}
            className="p-1.5 rounded-xl text-stone-400 hover:text-[#0F291E] hover:bg-stone-100 transition-colors"
            title="Reset to 06:00 AM"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Diurnal Timeline Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {DIURNAL_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;

          return (
            <button
              key={idx}
              onClick={() => handleStepSelect(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600/30'
                  : 'border-stone-200/90 bg-[#FBFDFB] hover:border-emerald-300 hover:bg-emerald-50/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className={isActive ? 'text-emerald-900 font-bold' : 'text-stone-500'}>
                  {step.time}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${
                    step.expectedDecision === 'IRRIGATE'
                      ? 'text-sky-800 bg-sky-50 border-sky-300'
                      : step.expectedDecision === 'IRRIGATE PARTIALLY'
                      ? 'text-amber-800 bg-amber-50 border-amber-300'
                      : 'text-emerald-800 bg-emerald-50 border-emerald-300'
                  }`}
                >
                  {step.expectedDecision === 'IRRIGATE'
                    ? 'IRRIGATE'
                    : step.expectedDecision === 'IRRIGATE PARTIALLY'
                    ? 'PARTIAL'
                    : 'OFF'}
                </span>
              </div>
              <div className="text-xs font-bold text-[#0F291E] truncate">
                {step.label}
              </div>
              <div className="text-[10px] text-stone-500 font-mono mt-1">
                {step.inputs.soilMoisture}% soil · {step.inputs.temperature}°C
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Explainer Card */}
      <div className="bg-[#F8FAF8] p-4 rounded-xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-800 font-bold">
              {currentStep.time} — {currentStep.label}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-700 font-mono">
              Agent Output: <strong className="text-[#0F291E]">{currentStepResult.planningAgent.decision}</strong> (Score {currentStepResult.planningAgent.decisionScore})
            </span>
          </div>
          <p className="text-stone-600 leading-relaxed font-medium">
            {currentStep.notes}
          </p>
        </div>

        <button
          onClick={() => onApplyStep(currentStep.inputs)}
          className="shrink-0 text-xs text-emerald-800 hover:text-emerald-900 font-bold px-3.5 py-2 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Apply To Main Dashboard</span>
        </button>
      </div>
    </div>
  );
};
