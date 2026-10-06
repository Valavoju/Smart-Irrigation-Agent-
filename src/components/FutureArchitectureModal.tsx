import React, { useState } from 'react';
import {
  X,
  BrainCircuit,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  CloudLightning,
  Workflow
} from 'lucide-react';

interface FutureArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FutureArchitectureModal: React.FC<FutureArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'roadmap'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-200 bg-[#F9FAF9]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-700 to-[#14532D] text-white shadow-sm shadow-emerald-900/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F291E]">
                Multi-Agent Architecture & Future AI Extension
              </h2>
              <p className="text-xs text-stone-500">
                Agentic system design: Observe → Analyze → Reason → Decide → Act → Monitor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-white text-[#0F291E] font-bold shadow-2xs'
                    : 'text-stone-600 hover:text-[#0F291E]'
                }`}
              >
                Architecture
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'code'
                    ? 'bg-white text-[#0F291E] font-bold shadow-2xs'
                    : 'text-stone-600 hover:text-[#0F291E]'
                }`}
              >
                Python Logic
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'roadmap'
                    ? 'bg-white text-[#0F291E] font-bold shadow-2xs'
                    : 'text-stone-600 hover:text-[#0F291E]'
                }`}
              >
                Future AI & LangGraph
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-[#0F291E] hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div className="bg-[#F8FAF8] border border-stone-200 rounded-2xl p-5">
                <span className="text-xs font-mono uppercase text-emerald-800 font-bold tracking-wider block mb-2">
                  System Architecture Diagram
                </span>

                <pre className="text-xs font-mono text-[#0F291E] leading-relaxed overflow-x-auto p-4 bg-white rounded-xl border border-stone-200">
{`                    SMART IRRIGATION AGENT
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       Soil Agent       Weather Agent    Crop Agent
      (Moisture %)      (Temp, RH, Rain) (Species, Stage)
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                  IRRIGATION PLANNING AGENT
                  (Multi-Factor Reasoning)
                              │
                      DECISION / REASONING
                              │
                              ▼
                     PUMP CONTROL AGENT
                   (Actuator / Duty Cycle)
                              │
                              ▼
                      IRRIGATION ACTION
                   (Pump ON/OFF + Volume)`}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#F8FAF8] border border-stone-200 rounded-2xl p-4 space-y-2">
                  <h4 className="font-bold text-[#0F291E] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-sky-600" />
                    Distributed Perception Layer
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    Soil, Weather, and Crop Agents operate as independent domain experts. Each normalizes raw physical readings into high-level semantic tokens (e.g. "Critically Dry", "Hot and Dry", "High Demand") with score contributions.
                  </p>
                </div>

                <div className="bg-[#F8FAF8] border border-stone-200 rounded-2xl p-4 space-y-2">
                  <h4 className="font-bold text-[#0F291E] flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-emerald-600" />
                    Coordinating Planning Layer
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    The Planning Agent aggregates disparate inputs and applies agricultural priority logic. It ensures rain predictions discount soil deficits, avoiding wasteful watering right before precipitation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">
                  Standard baseline Python implementation running in the multi-agent backend:
                </span>
                <span className="text-emerald-800 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Python 3.11+ / FastAPI
                </span>
              </div>

              <div className="bg-[#F8FAF8] rounded-2xl border border-stone-200 p-5 overflow-x-auto text-xs font-mono text-[#0F291E] leading-relaxed">
{`def soil_moisture_agent(soil_moisture: float) -> str:
    if soil_moisture < 30:
        return "Very Dry"
    elif soil_moisture < 50:
        return "Dry"
    else:
        return "Sufficient"

def weather_agent(temperature: float, humidity: float, rain_prob: float) -> str:
    if temperature > 35 and humidity < 40:
        return "Hot and Dry"
    elif rain_prob >= 70:
        return "Rain Expected"
    elif humidity > 75:
        return "Humid"
    else:
        return "Normal"

def crop_requirement_agent(crop: str, growth_stage: str) -> int:
    base = {"Rice": 80, "Wheat": 60, "Maize": 50, "Cotton": 45, "Tomato": 55}.get(crop, 50)
    if growth_stage.lower() == "flowering":
        base += 10
    return base

def irrigation_planning_agent(soil_moisture, weather_status, crop_req, rain_prob):
    score = 0
    if soil_moisture < 30: score += 3
    elif soil_moisture < 50: score += 2

    if weather_status == "Hot and Dry": score += 2

    if rain_prob >= 70: score -= 3
    elif rain_prob >= 40: score -= 1

    if crop_req >= 70: score += 2
    elif crop_req >= 50: score += 1

    if score >= 4:
        return "IRRIGATE", score
    elif score >= 2:
        return "IRRIGATE PARTIALLY", score
    else:
        return "DO NOT IRRIGATE", score

def pump_control_agent(decision: str) -> str:
    if decision == "IRRIGATE":
        return "Pump ON - Full irrigation recommended"
    elif decision == "IRRIGATE PARTIALLY":
        return "Pump ON - Partial irrigation recommended"
    else:
        return "Pump OFF - Save water"`}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="bg-[#F8FAF8] border border-stone-200 rounded-2xl p-5">
                <h4 className="text-sm font-bold text-[#0F291E] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Planned Integrations for Production Deployment
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  The modular multi-agent structure is explicitly designed so that each rule-based agent function can be swapped with real-world APIs, ML models, or LLM agents without altering the pipeline interface.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
                    <strong className="text-emerald-800 block font-bold">LangGraph / CrewAI Orchestration</strong>
                    <p className="text-stone-600 text-[11px]">
                      Replace static function dispatch with a LangGraph state graph allowing back-and-forth negotiation between Weather and Soil agents.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
                    <strong className="text-sky-800 block font-bold">Open-Meteo & Radar API</strong>
                    <p className="text-stone-600 text-[11px]">
                      Live GPS coordinate fetching for high-resolution 15-minute Doppler radar and evapotranspiration (ET₀) forecasts.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
                    <strong className="text-amber-800 block font-bold">Sentinel-2 Satellite NDVI & Thermal</strong>
                    <p className="text-stone-600 text-[11px]">
                      Multi-spectral satellite imagery to detect canopy vigor and chlorophyll stress before visual symptoms appear.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
                    <strong className="text-teal-800 block font-bold">Gemini Multimodal LLM Reasoning</strong>
                    <p className="text-stone-600 text-[11px]">
                      Agronomic reasoning over soil camera photos to detect fungal blight risks and salt buildup in drip emitters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#F9FAF9] flex items-center justify-between text-xs text-stone-600">
          <span className="font-medium">Framework: Modular Micro-Agent Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-[#0F291E] font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
