import React from 'react';
import { Droplets, Thermometer, CloudRain, Sprout, Gauge, Sliders, ArrowRight, Sparkles } from 'lucide-react';
import { FarmInputs, CropType, GrowthStage } from '../types/irrigation';

interface InputPanelProps {
  inputs: FarmInputs;
  setInputs: React.Dispatch<React.SetStateAction<FarmInputs>>;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  validationErrors?: string[];
  loadedScenarioName?: string | null;
}

const CROP_OPTIONS: { name: CropType; base: number; note: string }[] = [
  { name: 'Rice', base: 80, note: 'High water requirement (shallow roots, semi-aquatic)' },
  { name: 'Wheat', base: 60, note: 'Moderate demand (deep root exploratory extraction)' },
  { name: 'Maize', base: 50, note: 'Moderate requirement (sensitive during tasseling)' },
  { name: 'Cotton', base: 45, note: 'Drought-tolerant base requirement' },
  { name: 'Tomato', base: 55, note: 'Horticulture crop prone to blossom-end rot' },
];

export const InputPanel: React.FC<InputPanelProps> = ({
  inputs,
  setInputs,
  onAnalyze,
  isAnalyzing,
  validationErrors = [],
  loadedScenarioName,
}) => {
  const updateField = <K extends keyof FarmInputs>(key: K, value: FarmInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const selectedCropMeta = CROP_OPTIONS.find((c) => c.name === inputs.crop) ?? CROP_OPTIONS[0];
  const hasErrors = validationErrors.length > 0;

  return (
    <div id="input-section" className="bg-white border border-emerald-900/10 rounded-2xl p-5 sm:p-6 shadow-xs scroll-mt-20">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#0F291E] tracking-tight">
                Agricultural & Environmental Inputs
              </h2>
              {loadedScenarioName && (
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full">
                  LOADED: {loadedScenarioName}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500">
              Sensor readings & crop parameters driving the multi-agent decision system
            </p>
          </div>
        </div>
        <span className="text-xs text-emerald-800 font-mono bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full font-medium">
          Sensor Feed · Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Crop Selection */}
        <div className="space-y-1.5 bg-[#F9FAF9] p-3.5 rounded-xl border border-stone-200/70">
          <label className="text-xs font-bold text-[#0F291E] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-700" />
              Crop Type
            </span>
            <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-100/60 px-1.5 py-0.5 rounded">
              Base: {selectedCropMeta.base}
            </span>
          </label>
          <select
            value={inputs.crop}
            onChange={(e) => updateField('crop', e.target.value as CropType)}
            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-[#0F291E] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all shadow-2xs"
          >
            {CROP_OPTIONS.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} (Base {c.base})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-stone-600 leading-tight">
            {selectedCropMeta.note}
          </p>
        </div>

        {/* Growth Stage */}
        <div className="space-y-1.5 bg-[#F9FAF9] p-3.5 rounded-xl border border-stone-200/70">
          <label className="text-xs font-bold text-[#0F291E] flex items-center justify-between">
            <span>Growth Stage</span>
            {inputs.growthStage === 'Flowering' && (
              <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 font-semibold">
                +10 Water Demand
              </span>
            )}
          </label>
          <select
            value={inputs.growthStage}
            onChange={(e) => updateField('growthStage', e.target.value as GrowthStage)}
            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-[#0F291E] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all shadow-2xs"
          >
            <option value="Vegetative">Vegetative (Baseline leaf canopy)</option>
            <option value="Flowering">Flowering (+10 water demand)</option>
            <option value="Maturity">Maturity (Pre-harvest desiccation)</option>
          </select>
          <p className="text-[11px] text-stone-600 leading-tight">
            {inputs.growthStage === 'Flowering'
              ? 'Flowering stage raises water stress susceptibility.'
              : 'Standard physiological water requirement curve.'}
          </p>
        </div>

        {/* Soil Moisture */}
        <div className="space-y-1.5 bg-[#F9FAF9] p-3.5 rounded-xl border border-stone-200/70">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-[#0F291E] flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-sky-600" />
              Soil Moisture
            </label>
            <span
              className={`font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-full border ${
                inputs.soilMoisture < 30
                  ? 'text-rose-800 bg-rose-50 border-rose-300'
                  : inputs.soilMoisture < 50
                  ? 'text-amber-800 bg-amber-50 border-amber-300'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-300'
              }`}
            >
              {inputs.soilMoisture}% · {inputs.soilMoisture < 30 ? 'Very Dry' : inputs.soilMoisture < 50 ? 'Dry' : 'Sufficient'}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min={0}
              max={100}
              value={inputs.soilMoisture}
              onChange={(e) => updateField('soilMoisture', Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={inputs.soilMoisture}
              onChange={(e) =>
                updateField('soilMoisture', Math.max(0, Math.min(100, Number(e.target.value))))
              }
              className="w-16 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-right font-mono font-bold text-[#0F291E]"
            />
          </div>
          <p className="text-[11px] text-stone-600">
            &lt; 30% (+3 pts) · 30–49% (+2 pts) · ≥ 50% (0 pts)
          </p>
        </div>

        {/* Temperature */}
        <div className="space-y-1.5 bg-[#F9FAF9] p-3.5 rounded-xl border border-stone-200/70">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-[#0F291E] flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-600" />
              Temperature
            </label>
            <span
              className={`font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-full border ${
                inputs.temperature > 35
                  ? 'text-amber-800 bg-amber-50 border-amber-300'
                  : 'text-stone-700 bg-stone-100 border-stone-300'
              }`}
            >
              {inputs.temperature}°C {inputs.temperature > 35 && inputs.humidity < 40 ? '(Hot & Dry)' : ''}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min={10}
              max={50}
              value={inputs.temperature}
              onChange={(e) => updateField('temperature', Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min={10}
              max={50}
              value={inputs.temperature}
              onChange={(e) =>
                updateField('temperature', Math.max(10, Math.min(50, Number(e.target.value))))
              }
              className="w-16 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-right font-mono font-bold text-[#0F291E]"
            />
          </div>
          <p className="text-[11px] text-stone-600">
            &gt; 35°C with &lt; 40% humidity triggers "Hot and Dry" (+2 pts)
          </p>
        </div>

        {/* Relative Humidity */}
        <div className="space-y-1.5 bg-[#F9FAF9] p-3.5 rounded-xl border border-stone-200/70">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-[#0F291E] flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-sky-600" />
              Relative Humidity
            </label>
            <span
              className={`font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-full border ${
                inputs.humidity > 75
                  ? 'text-sky-800 bg-sky-50 border-sky-300'
                  : 'text-stone-700 bg-stone-100 border-stone-300'
              }`}
            >
              {inputs.humidity}% {inputs.humidity > 75 ? '(Humid)' : ''}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min={10}
              max={100}
              value={inputs.humidity}
              onChange={(e) => updateField('humidity', Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min={10}
              max={100}
              value={inputs.humidity}
              onChange={(e) =>
                updateField('humidity', Math.max(10, Math.min(100, Number(e.target.value))))
              }
              className="w-16 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-right font-mono font-bold text-[#0F291E]"
            />
          </div>
          <p className="text-[11px] text-stone-600">
            &gt; 75% indicates humid condition (slows leaf evaporation)
          </p>
        </div>

        {/* Rain Probability */}
        <div className="space-y-1.5 bg-[#F9FAF9] p-3.5 rounded-xl border border-stone-200/70">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-[#0F291E] flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-blue-600" />
              Rain Probability
            </label>
            <span
              className={`font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-full border ${
                inputs.rainProbability >= 70
                  ? 'text-blue-800 bg-blue-50 border-blue-300'
                  : inputs.rainProbability >= 40
                  ? 'text-indigo-800 bg-indigo-50 border-indigo-300'
                  : 'text-stone-700 bg-stone-100 border-stone-300'
              }`}
            >
              {inputs.rainProbability}% {inputs.rainProbability >= 70 ? '(-3 pts)' : inputs.rainProbability >= 40 ? '(-1 pt)' : '(0 pt)'}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min={0}
              max={100}
              value={inputs.rainProbability}
              onChange={(e) => updateField('rainProbability', Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={inputs.rainProbability}
              onChange={(e) =>
                updateField('rainProbability', Math.max(0, Math.min(100, Number(e.target.value))))
              }
              className="w-16 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-right font-mono font-bold text-[#0F291E]"
            />
          </div>
          <p className="text-[11px] text-stone-600">
            ≥ 70% (-3 pts discount) · 40–69% (-1 pt discount)
          </p>
        </div>
      </div>

      {/* Validation Error Alert if any */}
      {hasErrors && (
        <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
          <span className="font-bold block">Input Validation Alert:</span>
          <ul className="list-disc pl-4 space-y-0.5">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Field Size & Action Bar */}
      <div className="mt-6 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-stone-600">
          <span>Field Parcel Size:</span>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="20"
              value={inputs.fieldSizeHectares ?? 1.0}
              onChange={(e) => updateField('fieldSizeHectares', Math.max(0.1, Number(e.target.value)))}
              className="w-16 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-mono font-bold text-[#0F291E] text-right shadow-2xs"
            />
            <span className="font-semibold text-stone-700">hectares (ha)</span>
          </div>
          <span className="text-stone-300 hidden sm:inline">·</span>
          <span className="hidden md:inline text-stone-500">
            Used to calculate exact liters of conserved water
          </span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || hasErrors}
          className={`px-7 py-3 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] cursor-pointer ${
            hasErrors
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
              : isAnalyzing
              ? 'bg-emerald-800 text-emerald-100 cursor-wait shadow-emerald-950/10'
              : 'bg-gradient-to-r from-emerald-700 via-[#14532D] to-teal-800 hover:from-emerald-800 hover:to-[#0F3822] text-white shadow-emerald-900/20 hover:shadow-lg'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing agricultural conditions...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>ANALYZE IRRIGATION REQUIREMENT</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
