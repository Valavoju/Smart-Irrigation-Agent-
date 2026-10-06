export type CropType = 'Rice' | 'Wheat' | 'Maize' | 'Cotton' | 'Tomato';

export type GrowthStage = 'Vegetative' | 'Flowering' | 'Maturity';

export type SoilStatus = 'Very Dry' | 'Dry' | 'Sufficient';

export type WeatherCondition = 'Hot and Dry' | 'Humid' | 'Rain Expected' | 'Normal';

export type PlanningDecision = 'IRRIGATE' | 'IRRIGATE PARTIALLY' | 'DO NOT IRRIGATE';

export type PumpStatus = 'ON' | 'OFF';

export interface FarmInputs {
  crop: CropType;
  growthStage: GrowthStage;
  soilMoisture: number; // 0 - 100%
  temperature: number; // °C
  humidity: number; // %
  rainProbability: number; // %
  fieldSizeHectares?: number; // default 1.0 ha
}

export interface SoilAgentOutput {
  name: string;
  input: {
    soilMoisture: number;
  };
  status: SoilStatus;
  analysis: string;
  confidence: number;
  scoreContribution: number;
}

export interface WeatherAgentOutput {
  name: string;
  input: {
    temperature: number;
    humidity: number;
    rainProbability: number;
  };
  condition: WeatherCondition;
  analysis: string;
  evaporativeDemand: 'High' | 'Moderate' | 'Low';
  weatherScoreContribution: number;
  rainScoreContribution: number;
}

export interface CropAgentOutput {
  name: string;
  input: {
    crop: CropType;
    growthStage: GrowthStage;
  };
  baseRequirement: number;
  waterRequirement: number;
  level: 'High' | 'Moderate' | 'Low';
  analysis: string;
  scoreContribution: number;
}

export interface DecisionFactor {
  factor: string;
  inputValue: string;
  impactText: string;
  points: number;
  favorableForIrrigation: boolean | null;
}

export interface PlanningAgentOutput {
  name: string;
  decision: PlanningDecision;
  decisionScore: number;
  summary: string;
  reasoning: string;
  factors: DecisionFactor[];
  thresholdMet: string;
}

export interface PumpAgentOutput {
  name: string;
  pumpStatus: PumpStatus;
  action: string;
  flowRateLitersPerHour: number;
  recommendedDurationMinutes: number;
  estimatedWaterUsageLiters: number;
  estimatedWaterSavedLiters: number;
  valveDutyCycle: string;
}

export interface AgentActivityItem {
  id: string;
  timestamp: string;
  agentName: string;
  agentIcon: string;
  message: string;
  status: 'completed' | 'in_progress' | 'queued';
  details?: string;
}

export interface WaterConservationAnalysis {
  decision: PlanningDecision;
  headline: string;
  explanation: string;
  waterSavedLitersPerHa: number;
  timerWaterWastedLitersPerHa: number;
  sdgImpact: {
    sdg6: string;
    sdg2: string;
    sdg12: string;
    sdg13: string;
  };
}

export interface MultiAgentResult {
  inputs: FarmInputs;
  soilAgent: SoilAgentOutput;
  weatherAgent: WeatherAgentOutput;
  cropAgent: CropAgentOutput;
  planningAgent: PlanningAgentOutput;
  pumpAgent: PumpAgentOutput;
  conservation: WaterConservationAnalysis;
  activityLog: AgentActivityItem[];
  timestamp: string;
}

export interface ScenarioPreset {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  inputs: FarmInputs;
  expectedDecision: PlanningDecision;
  why: string;
}
