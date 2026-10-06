import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ScenarioBar } from './components/ScenarioBar';
import { InputPanel } from './components/InputPanel';
import { AgentPipelineVisualizer } from './components/AgentPipelineVisualizer';
import { AgentCards } from './components/AgentCards';
import { FinalDecisionCard } from './components/FinalDecisionCard';
import { DecisionReasoningBreakdown } from './components/DecisionReasoningBreakdown';
import { WaterConservationInsight } from './components/WaterConservationInsight';
import { AgentActivityLog } from './components/AgentActivityLog';
import { ConventionalVsAgentComparison } from './components/ConventionalVsAgentComparison';
import { FutureArchitectureModal } from './components/FutureArchitectureModal';
import { AgroDiurnalSimulator } from './components/AgroDiurnalSimulator';
import { ReportModal } from './components/ReportModal';
import { AnalysisProcessingModal } from './components/AnalysisProcessingModal';
import { FarmInputs, MultiAgentResult, ScenarioPreset } from './types/irrigation';
import {
  executeMultiAgentSystem,
  PREDEFINED_SCENARIOS,
  validateInputs,
  validateAnalysisForReport,
} from './agents/agentLogic';
import { generateOnePagePdfReport } from './utils/generatePdfReport';
import {
  Droplets,
  Sparkles,
  Layers,
  ShieldCheck,
  FileDown,
  CheckCircle2,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'comparison' | 'future'>('dashboard');
  const [isFutureModalOpen, setIsFutureModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  // Default input state: Scenario 1 (Rice, Flowering, 20% soil, 38°C, 30% humidity, 10% rain)
  const [inputs, setInputs] = useState<FarmInputs>({
    crop: 'Rice',
    growthStage: 'Flowering',
    soilMoisture: 20,
    temperature: 38,
    humidity: 30,
    rainProbability: 10,
    fieldSizeHectares: 1.0,
  });

  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>('scenario-1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(7); // fully completed
  const [result, setResult] = useState<MultiAgentResult>(() => executeMultiAgentSystem(inputs));

  // Input validation
  const validation = useMemo(() => validateInputs(inputs), [inputs]);
  const isReportReady = useMemo(() => validateAnalysisForReport(result), [result]);

  // Find currently loaded scenario preset if any
  const loadedScenario = useMemo(
    () => PREDEFINED_SCENARIOS.find((s) => s.id === selectedScenarioId) ?? null,
    [selectedScenarioId]
  );

  // Trigger analysis with complete 7-stage processing modal
  const handleAnalyze = useCallback(() => {
    if (!validation.isValid) return;

    setIsAnalyzing(true);
    setIsProcessingModalOpen(true);
    setActiveStepIndex(0);

    // Sequential agent execution progression (7 steps)
    const stepDuration = 260;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setActiveStepIndex(current);

      if (current >= 7) {
        clearInterval(interval);
        const finalResult = executeMultiAgentSystem(inputs);
        setResult(finalResult);
        setIsAnalyzing(false);

        // Close processing modal after brief visual confirmation
        setTimeout(() => {
          setIsProcessingModalOpen(false);
        }, 500);
      }
    }, stepDuration);
  }, [inputs, validation.isValid]);

  // Handle Preset Scenario Selection: Load inputs & scroll to input form
  const handleSelectScenario = (scenario: ScenarioPreset) => {
    setSelectedScenarioId(scenario.id);
    setInputs({ ...scenario.inputs });

    // Smooth scroll to the input & analysis form
    setTimeout(() => {
      const el = document.getElementById('input-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Handle step from 24h Diurnal Simulator
  const handleApplyDiurnalStep = (newInputs: FarmInputs) => {
    setSelectedScenarioId(null);
    setInputs(newInputs);
    const newResult = executeMultiAgentSystem(newInputs);
    setResult(newResult);
    setActiveStepIndex(7);
  };

  // Handle manual input changes - clear scenario lock
  const handleInputChange = (newInputs: React.SetStateAction<FarmInputs>) => {
    setSelectedScenarioId(null);
    setInputs(newInputs);
  };

  // Direct PDF Download Handler
  const handleDownloadPdf = () => {
    if (!result) return;
    generateOnePagePdfReport(result);
  };

  return (
    <div className="min-h-screen bg-agro-pattern text-[#0F291E] flex flex-col selection:bg-emerald-600/20 selection:text-emerald-900">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFutureModal={() => setIsFutureModalOpen(true)}
        onDownloadReport={handleDownloadPdf}
        onOpenReport={() => setIsReportModalOpen(true)}
        isReportReady={isReportReady}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Navigation Tabs Bar on Mobile / Tablet */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-stone-600 bg-white border border-stone-200'
            }`}
          >
            Agent Dashboard
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all ${
              activeTab === 'architecture'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-stone-600 bg-white border border-stone-200'
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all ${
              activeTab === 'comparison'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-stone-600 bg-white border border-stone-200'
            }`}
          >
            Timer vs Agent
          </button>
          <button
            onClick={() => setActiveTab('future')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all ${
              activeTab === 'future'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-stone-600 bg-white border border-stone-200'
            }`}
          >
            Future Roadmap
          </button>
        </div>

        {/* Tab 1: Primary Agent Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* 1. Predefined Evaluation Scenarios */}
            <ScenarioBar
              onSelectScenario={handleSelectScenario}
              selectedId={selectedScenarioId}
              currentDecision={result?.planningAgent.decision}
            />

            {/* 2. Agricultural Input Panel */}
            <InputPanel
              inputs={inputs}
              setInputs={handleInputChange}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              validationErrors={validation.errors}
              loadedScenarioName={loadedScenario ? `${loadedScenario.inputs.crop} · ${loadedScenario.inputs.growthStage}` : null}
            />

            {/* 3. Multi-Agent Collaboration Workflow Visualizer */}
            <AgentPipelineVisualizer
              result={result}
              activeStepIndex={5}
            />

            {/* 4. Analysis Complete Banner & One-Page Report Action */}
            {isReportReady && (
              <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-2 border-emerald-600 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-extrabold text-[#0F291E]">
                        ANALYSIS COMPLETE
                      </h3>
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                        ONE-PAGE REPORT READY
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      All 5 agents evaluated conditions for {inputs.crop} ({inputs.growthStage}). You can now download or preview the official one-page agricultural assessment report.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadPdf}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-700 to-[#14532D] hover:from-emerald-800 hover:to-[#0F3822] text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>📄 DOWNLOAD ONE-PAGE REPORT</span>
                  </button>

                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-[#0F291E] border border-stone-200 shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Preview Sheet</span>
                  </button>
                </div>
              </div>
            )}

            {/* 5. Large Authoritative Final Decision Card */}
            {result && (
              <FinalDecisionCard
                result={result}
                onDownloadReport={handleDownloadPdf}
                onOpenReport={() => setIsReportModalOpen(true)}
              />
            )}

            {/* 6. The 5 Specialized Agent Cards (Soil, Weather, Crop, Planning, Pump) */}
            {result && <AgentCards result={result} />}

            {/* 7. "Why did the agent decide this?" Multi-factor Reasoning Audit */}
            {result && <DecisionReasoningBreakdown result={result} />}

            {/* 8. Water Conservation Insight & SDG Alignment */}
            {result && <WaterConservationInsight result={result} />}

            {/* 9. 24-Hour Diurnal Climate Simulator */}
            <AgroDiurnalSimulator onApplyStep={handleApplyDiurnalStep} />

            {/* 10. Sequential Agent Activity Log */}
            {result && <AgentActivityLog logs={result.activityLog} />}
          </div>
        )}

        {/* Tab 2: Dedicated Pipeline & Architecture View */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <AgentPipelineVisualizer
              result={result}
              activeStepIndex={5}
            />
            {result && <AgentCards result={result} />}
            <div className="p-6 sm:p-7 bg-white border border-emerald-900/10 rounded-2xl space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-[#0F291E] flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                Autonomous Multi-Agent Loop: Observe → Analyze → Reason → Decide → Act → Monitor
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Rather than treating irrigation as a single hardcoded calculation or isolated rule-check, the Smart Irrigation Agent operates as an interconnected multi-agent community. Sensory agents independently evaluate domain metrics, the Irrigation Planning Agent arbitrates trade-offs (e.g. soil moisture deficit vs incoming rainfall), and the Pump Control Agent executes safe electrical duty cycles.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsFutureModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-700 to-[#14532D] text-white hover:from-emerald-800 hover:to-[#0F3822] shadow-sm transition-all cursor-pointer"
                >
                  View LangGraph & Production AI Extension Spec
                </button>
                {isReportReady && (
                  <button
                    onClick={handleDownloadPdf}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download Assessment Report</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Conventional Timer vs Agent Comparison */}
        {activeTab === 'comparison' && (
          <ConventionalVsAgentComparison />
        )}

        {/* Tab 4: Future Roadmap & Extension */}
        {activeTab === 'future' && (
          <div className="space-y-6">
            <div className="bg-white border border-emerald-900/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h2 className="text-lg font-bold text-[#0F291E] mb-2">
                Production AI Architecture & Autonomous Extensibility
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed mb-4 font-medium">
                Designed from day one to accommodate modern LLM agents (LangGraph / CrewAI), Doppler weather APIs, and Satellite NDVI vegetation index tracking.
              </p>
              <button
                onClick={() => setIsFutureModalOpen(true)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-700 to-[#14532D] text-white hover:from-emerald-800 hover:to-[#0F3822] shadow-sm transition-all cursor-pointer"
              >
                Open Architecture Inspector & Code Specs
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white/80 backdrop-blur-xs py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F291E]">Smart Irrigation Agent</span>
            <span className="text-stone-300">·</span>
            <span>Multi-Agent AI Decision System for Sustainable Agriculture</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <span className="text-emerald-700">SDG 6: Clean Water</span>
            <span className="text-stone-300">|</span>
            <span className="text-amber-700">SDG 2: Zero Hunger</span>
            <span className="text-stone-300">|</span>
            <span className="text-sky-700">SDG 13: Climate Action</span>
          </div>
        </div>
      </footer>

      {/* Analysis Processing Checklist Modal */}
      <AnalysisProcessingModal
        isOpen={isProcessingModalOpen}
        activeStepIndex={activeStepIndex}
      />

      {/* One-Page Report Preview & Download Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        result={result}
      />

      {/* Future Architecture Modal */}
      <FutureArchitectureModal
        isOpen={isFutureModalOpen}
        onClose={() => setIsFutureModalOpen(false)}
      />
    </div>
  );
}
