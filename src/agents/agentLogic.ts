import {
  FarmInputs,
  SoilAgentOutput,
  WeatherAgentOutput,
  CropAgentOutput,
  PlanningAgentOutput,
  PumpAgentOutput,
  DecisionFactor,
  WaterConservationAnalysis,
  AgentActivityItem,
  MultiAgentResult,
  ScenarioPreset,
  SoilStatus,
  WeatherCondition,
  PlanningDecision,
  PumpStatus
} from '../types/irrigation';

/**
 * AGENT 1: Soil Moisture Agent 💧
 * Analyzes root zone volumetric soil moisture percentage
 */
export function runSoilMoistureAgent(soilMoisture: number): SoilAgentOutput {
  let status: SoilStatus;
  let analysis: string;
  let scoreContribution = 0;

  if (soilMoisture < 30) {
    status = 'Very Dry';
    analysis = 'Soil moisture is critically low (< 30%). Crop root zone is nearing permanent wilting point. Immediate replenishment required.';
    scoreContribution = 3;
  } else if (soilMoisture < 50) {
    status = 'Dry';
    analysis = 'Soil moisture is sub-optimal (30–49%). Capillary water is depleting, which may cause physiological stress.';
    scoreContribution = 2;
  } else {
    status = 'Sufficient';
    analysis = 'Soil moisture is sufficient (≥ 50%). Adequate field capacity is present. Immediate irrigation may not be necessary.';
    scoreContribution = 0;
  }

  return {
    name: 'Soil Moisture Agent',
    input: { soilMoisture },
    status,
    analysis,
    confidence: 96,
    scoreContribution,
  };
}

/**
 * AGENT 2: Weather Agent 🌦️
 * Analyzes ambient thermal conditions, air humidity, and precipitation probability
 */
export function runWeatherAgent(
  temperature: number,
  humidity: number,
  rainProbability: number
): WeatherAgentOutput {
  let condition: WeatherCondition;
  let analysis: string;
  let evaporativeDemand: 'High' | 'Moderate' | 'Low' = 'Moderate';
  let weatherScoreContribution = 0;
  let rainScoreContribution = 0;

  // Weather condition logic
  if (temperature > 35 && humidity < 40) {
    condition = 'Hot and Dry';
    analysis = `Extreme heat (${temperature}°C) coupled with dry air (${humidity}%) significantly spikes vapor pressure deficit (VPD) and atmospheric transpiration rate.`;
    evaporativeDemand = 'High';
    weatherScoreContribution = 2;
  } else if (rainProbability >= 70) {
    condition = 'Rain Expected';
    analysis = `High probability of natural precipitation (${rainProbability}%) detected. Ambient rainfall will likely replenish root moisture naturally.`;
    evaporativeDemand = 'Low';
    weatherScoreContribution = 0;
  } else if (humidity > 75) {
    condition = 'Humid';
    analysis = `High atmospheric humidity (${humidity}%) restricts crop transpiration and slows soil surface evaporation.`;
    evaporativeDemand = 'Low';
    weatherScoreContribution = 0;
  } else {
    condition = 'Normal';
    analysis = `Moderate temperature (${temperature}°C) and standard humidity (${humidity}%). Standard evapotranspiration curve.`;
    evaporativeDemand = 'Moderate';
    weatherScoreContribution = 0;
  }

  // Rain prediction points
  if (rainProbability >= 70) {
    rainScoreContribution = -3;
  } else if (rainProbability >= 40) {
    rainScoreContribution = -1;
  } else {
    rainScoreContribution = 0;
  }

  return {
    name: 'Weather Agent',
    input: { temperature, humidity, rainProbability },
    condition,
    analysis,
    evaporativeDemand,
    weatherScoreContribution,
    rainScoreContribution,
  };
}

/**
 * AGENT 3: Crop Requirement Agent 🌱
 * Evaluates crop-specific water coefficient and growth stage physiology
 */
export function runCropRequirementAgent(
  crop: FarmInputs['crop'],
  growthStage: FarmInputs['growthStage']
): CropAgentOutput {
  const baseRequirements: Record<FarmInputs['crop'], number> = {
    Rice: 80,
    Wheat: 60,
    Maize: 50,
    Cotton: 45,
    Tomato: 55,
  };

  const baseRequirement = baseRequirements[crop] ?? 50;
  const isFlowering = growthStage.toLowerCase() === 'flowering';
  const waterRequirement = isFlowering ? baseRequirement + 10 : baseRequirement;

  let level: 'High' | 'Moderate' | 'Low';
  let scoreContribution = 0;

  if (waterRequirement >= 70) {
    level = 'High';
    scoreContribution = 2;
  } else if (waterRequirement >= 50) {
    level = 'Moderate';
    scoreContribution = 1;
  } else {
    level = 'Low';
    scoreContribution = 0;
  }

  const stageDescription = isFlowering
    ? 'Flowering stage increases reproductive water sensitivity (+10 demand); moisture stress now would severely impact yield.'
    : growthStage === 'Vegetative'
    ? 'Vegetative stage involves active foliage and root development with baseline water intake.'
    : 'Maturity stage focuses on grain/fruit filling and desiccation, reducing peak moisture dependence.';

  const cropSpecific =
    crop === 'Rice'
      ? 'Rice is a semi-aquatic high-demand crop with shallow root zones sensitive to desiccation.'
      : crop === 'Wheat'
      ? 'Wheat maintains moderate deep-root extraction capabilities.'
      : crop === 'Maize'
      ? 'Maize has moderate water demand but critical sensitivity during silking and tassel formation.'
      : crop === 'Cotton'
      ? 'Cotton is drought-tolerant but requires timely moisture during square formation and boll opening.'
      : 'Tomato is a high-transpiration horticulture crop sensitive to blossom-end rot if moisture fluctuates.';

  const analysis = `${crop} has a base water requirement of ${baseRequirement}. ${stageDescription} ${cropSpecific}`;

  return {
    name: 'Crop Requirement Agent',
    input: { crop, growthStage },
    baseRequirement,
    waterRequirement,
    level,
    analysis,
    scoreContribution,
  };
}

/**
 * AGENT 4: Irrigation Planning Agent 🧠 (Central Multi-Agent Decision Synthesizer)
 * Integrates environmental inputs and sub-agent assessments to calculate the net decision score
 */
export function runIrrigationPlanningAgent(
  soilOutput: SoilAgentOutput,
  weatherOutput: WeatherAgentOutput,
  cropOutput: CropAgentOutput
): PlanningAgentOutput {
  let score = 0;
  const factors: DecisionFactor[] = [];

  // Factor 1: Soil Condition
  const soilMoisture = soilOutput.input.soilMoisture;
  if (soilMoisture < 30) {
    score += 3;
    factors.push({
      factor: 'Soil Moisture',
      inputValue: `${soilMoisture}% (< 30%)`,
      impactText: 'Critically dry root zone requires immediate replenishment',
      points: 3,
      favorableForIrrigation: true,
    });
  } else if (soilMoisture < 50) {
    score += 2;
    factors.push({
      factor: 'Soil Moisture',
      inputValue: `${soilMoisture}% (30–49%)`,
      impactText: 'Sub-optimal soil moisture signals moderate watering need',
      points: 2,
      favorableForIrrigation: true,
    });
  } else {
    factors.push({
      factor: 'Soil Moisture',
      inputValue: `${soilMoisture}% (≥ 50%)`,
      impactText: 'Sufficient moisture in root zone; no baseline deficit',
      points: 0,
      favorableForIrrigation: false,
    });
  }

  // Factor 2: Weather Condition
  if (weatherOutput.condition === 'Hot and Dry') {
    score += 2;
    factors.push({
      factor: 'Weather Conditions',
      inputValue: `${weatherOutput.input.temperature}°C / ${weatherOutput.input.humidity}% RH`,
      impactText: 'Hot and dry microclimate accelerates rapid evapotranspiration',
      points: 2,
      favorableForIrrigation: true,
    });
  } else {
    factors.push({
      factor: 'Weather Conditions',
      inputValue: `${weatherOutput.condition} (${weatherOutput.input.temperature}°C)`,
      impactText: 'Standard or humid atmospheric demand; no extreme vapor pressure deficit',
      points: 0,
      favorableForIrrigation: null,
    });
  }

  // Factor 3: Rain Prediction
  const rainProb = weatherOutput.input.rainProbability;
  if (rainProb >= 70) {
    score -= 3;
    factors.push({
      factor: 'Rain Probability',
      inputValue: `${rainProb}% (≥ 70%)`,
      impactText: 'Imminent rainfall expected; artificial irrigation would be redundant and waste water',
      points: -3,
      favorableForIrrigation: false,
    });
  } else if (rainProb >= 40) {
    score -= 1;
    factors.push({
      factor: 'Rain Probability',
      inputValue: `${rainProb}% (40–69%)`,
      impactText: 'Moderate chance of precipitation; warrants conservative water application',
      points: -1,
      favorableForIrrigation: false,
    });
  } else {
    factors.push({
      factor: 'Rain Probability',
      inputValue: `${rainProb}% (< 40%)`,
      impactText: 'Low chance of natural rainfall; cannot rely on precipitation',
      points: 0,
      favorableForIrrigation: true,
    });
  }

  // Factor 4: Crop Water Requirement
  const req = cropOutput.waterRequirement;
  if (req >= 70) {
    score += 2;
    factors.push({
      factor: 'Crop Water Demand',
      inputValue: `${req} index (${cropOutput.input.crop} · ${cropOutput.input.growthStage})`,
      impactText: 'High crop requirement due to crop physiology and reproductive stage',
      points: 2,
      favorableForIrrigation: true,
    });
  } else if (req >= 50) {
    score += 1;
    factors.push({
      factor: 'Crop Water Demand',
      inputValue: `${req} index (${cropOutput.input.crop} · ${cropOutput.input.growthStage})`,
      impactText: 'Moderate crop requirement accommodates standard moisture regime',
      points: 1,
      favorableForIrrigation: true,
    });
  } else {
    factors.push({
      factor: 'Crop Water Demand',
      inputValue: `${req} index (${cropOutput.input.crop} · ${cropOutput.input.growthStage})`,
      impactText: 'Low water requirement; resilient against minor deficit',
      points: 0,
      favorableForIrrigation: false,
    });
  }

  // Final Decision Logic
  let decision: PlanningDecision;
  let summary: string;
  let reasoning: string;
  let thresholdMet: string;

  if (score >= 4) {
    decision = 'IRRIGATE';
    thresholdMet = 'Score ≥ 4 (High Water Demand)';
    summary = 'Immediate irrigation is recommended.';
    
    // Human-readable contextual reasoning
    if (soilMoisture < 30 && weatherOutput.condition === 'Hot and Dry') {
      reasoning = 'Soil moisture is critically low, the weather is hot and dry, and rainfall probability is low. High crop demand indicates urgent irrigation is required to avoid yield loss.';
    } else if (soilMoisture < 30) {
      reasoning = 'Soil moisture is critically low and crop requirement cannot wait. Natural precipitation probability is insufficient to sustain the crop.';
    } else {
      reasoning = 'Cumulative environmental stress (elevated evapotranspiration, dry soil, and high crop stage requirement) exceeds the threshold (Score: ' + score + '). Full irrigation recommended.';
    }
  } else if (score >= 2) {
    decision = 'IRRIGATE PARTIALLY';
    thresholdMet = 'Score 2–3 (Moderate Water Demand)';
    summary = 'Controlled partial irrigation recommended.';
    reasoning = 'Moderate soil depletion detected alongside balanced weather conditions. A partial irrigation cycle will sustain crop vigour without risking overwatering or runoff.';
  } else {
    decision = 'DO NOT IRRIGATE';
    thresholdMet = 'Score < 2 (Low / Delayed Demand)';
    summary = 'Irrigation can be safely delayed to conserve water.';
    
    if (rainProb >= 70) {
      reasoning = 'Soil moisture is sufficient and there is a high probability of rainfall (' + rainProb + '%). Irrigation must be delayed to avoid waterlogging and conserve fresh water resources.';
    } else if (soilMoisture >= 50) {
      reasoning = 'Soil moisture is currently sufficient (≥ 50%) and ambient weather does not present acute stress. Unnecessary watering can be avoided.';
    } else {
      reasoning = 'Moderate rainfall expectation or low crop demand counteracts slight moisture depletion (Score: ' + score + '). Postponing irrigation promotes deep root exploration and saves water.';
    }
  }

  return {
    name: 'Irrigation Planning Agent',
    decision,
    decisionScore: score,
    summary,
    reasoning,
    factors,
    thresholdMet,
  };
}

/**
 * AGENT 5: Pump Control Agent 🚰
 * Actuator translation module: executes physical valve and pump scheduling based on Planning decision
 */
export function runPumpControlAgent(decision: PlanningDecision, fieldSizeHectares = 1.0): PumpAgentOutput {
  let pumpStatus: PumpStatus;
  let action: string;
  let flowRateLitersPerHour: number;
  let recommendedDurationMinutes: number;
  let estimatedWaterUsageLiters: number;
  let estimatedWaterSavedLiters: number;
  let valveDutyCycle: string;

  // Baseline standard timer system typically runs 45 mins at 6,000 L/hr = 4,500 L per ha
  const baselineTimerUsage = 4500 * fieldSizeHectares;

  if (decision === 'IRRIGATE') {
    pumpStatus = 'ON';
    action = 'Pump ON – Full irrigation recommended';
    flowRateLitersPerHour = 6000;
    recommendedDurationMinutes = 45;
    estimatedWaterUsageLiters = Math.round(flowRateLitersPerHour * (recommendedDurationMinutes / 60) * fieldSizeHectares);
    estimatedWaterSavedLiters = 0;
    valveDutyCycle = '100% Continuous Flow';
  } else if (decision === 'IRRIGATE PARTIALLY') {
    pumpStatus = 'ON';
    action = 'Pump ON – Partial irrigation recommended';
    flowRateLitersPerHour = 4500;
    recommendedDurationMinutes = 20;
    estimatedWaterUsageLiters = Math.round(flowRateLitersPerHour * (recommendedDurationMinutes / 60) * fieldSizeHectares);
    estimatedWaterSavedLiters = baselineTimerUsage - estimatedWaterUsageLiters;
    valveDutyCycle = '50% Pulse / Micro-Sprinkler Cycle';
  } else {
    pumpStatus = 'OFF';
    action = 'Pump OFF – Save water';
    flowRateLitersPerHour = 0;
    recommendedDurationMinutes = 0;
    estimatedWaterUsageLiters = 0;
    estimatedWaterSavedLiters = baselineTimerUsage;
    valveDutyCycle = '0% Valves Closed (Standby)';
  }

  return {
    name: 'Pump Control Agent',
    pumpStatus,
    action,
    flowRateLitersPerHour,
    recommendedDurationMinutes,
    estimatedWaterUsageLiters,
    estimatedWaterSavedLiters,
    valveDutyCycle,
  };
}

/**
 * Water Conservation Insight Generator (SDG Alignment & Environmental Impact)
 */
export function generateConservationInsight(
  decision: PlanningDecision,
  waterSavedLiters: number
): WaterConservationAnalysis {
  let headline: string;
  let explanation: string;

  if (decision === 'DO NOT IRRIGATE') {
    headline = 'Maximum Conservation: Zero Irrigation Required';
    explanation = 'Irrigation was delayed because sufficient soil moisture and expected rainfall indicate that additional water is unnecessary. By withholding the pump cycle, you eliminate runoff, prevent nitrate leaching into aquifers, and conserve precious reservoir reserves.';
  } else if (decision === 'IRRIGATE PARTIALLY') {
    headline = 'Precision Conservation: Targeted Deficit Irrigation';
    explanation = 'Partial irrigation is recommended to maintain crop health while minimizing unnecessary water consumption. Pulsed micro-irrigation satisfies the immediate capillary tension threshold without oversaturating topsoil.';
  } else {
    headline = 'Targeted Replenishment: Crop Stress Aversion';
    explanation = 'Irrigation is recommended because soil moisture is critically low and environmental conditions indicate increased crop water demand. Targeted delivery protects yield potential while ensuring water is applied strictly when required.';
  }

  return {
    decision,
    headline,
    explanation,
    waterSavedLitersPerHa: waterSavedLiters,
    timerWaterWastedLitersPerHa: decision === 'DO NOT IRRIGATE' ? 4500 : decision === 'IRRIGATE PARTIALLY' ? 3000 : 0,
    sdgImpact: {
      sdg6: 'SDG 6 (Clean Water): Curtails agricultural overdraft by preventing fixed-schedule over-watering.',
      sdg2: 'SDG 2 (Zero Hunger): Safeguards crop yields by eliminating moisture deficit and root hypoxia.',
      sdg12: 'SDG 12 (Responsible Production): Implements closed-loop precision resource allocation.',
      sdg13: 'SDG 13 (Climate Action): Reduces pump electrical kilowatt consumption and builds drought resilience.',
    },
  };
}

/**
 * Orchestrates the full Multi-Agent Execution Pipeline
 */
export function executeMultiAgentSystem(inputs: FarmInputs): MultiAgentResult {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. Soil Agent
  const soilAgent = runSoilMoistureAgent(inputs.soilMoisture);

  // 2. Weather Agent
  const weatherAgent = runWeatherAgent(inputs.temperature, inputs.humidity, inputs.rainProbability);

  // 3. Crop Requirement Agent
  const cropAgent = runCropRequirementAgent(inputs.crop, inputs.growthStage);

  // 4. Planning Agent
  const planningAgent = runIrrigationPlanningAgent(soilAgent, weatherAgent, cropAgent);

  // 5. Pump Agent
  const pumpAgent = runPumpControlAgent(planningAgent.decision, inputs.fieldSizeHectares ?? 1.0);

  // Conservation Analysis
  const conservation = generateConservationInsight(planningAgent.decision, pumpAgent.estimatedWaterSavedLiters);

  // Activity Log
  const activityLog: AgentActivityItem[] = [
    {
      id: 'log-1',
      timestamp: timestamp,
      agentName: 'Soil Moisture Agent',
      agentIcon: '💧',
      message: `Analyzed root zone moisture at ${inputs.soilMoisture}% → Status: ${soilAgent.status} (${soilAgent.scoreContribution > 0 ? '+' + soilAgent.scoreContribution + ' pts' : '0 pts'})`,
      status: 'completed',
      details: soilAgent.analysis,
    },
    {
      id: 'log-2',
      timestamp: timestamp,
      agentName: 'Weather Agent',
      agentIcon: '🌦️',
      message: `Evaluated microclimate: ${inputs.temperature}°C, ${inputs.humidity}% RH, ${inputs.rainProbability}% Rain → Condition: ${weatherAgent.condition}`,
      status: 'completed',
      details: `Atmospheric demand: ${weatherAgent.evaporativeDemand}. Weather score: +${weatherAgent.weatherScoreContribution}, Rain discount: ${weatherAgent.rainScoreContribution} pts.`,
    },
    {
      id: 'log-3',
      timestamp: timestamp,
      agentName: 'Crop Requirement Agent',
      agentIcon: '🌱',
      message: `Calculated ${inputs.crop} demand for ${inputs.growthStage} stage → Water Index: ${cropAgent.waterRequirement} (${cropAgent.level})`,
      status: 'completed',
      details: cropAgent.analysis,
    },
    {
      id: 'log-4',
      timestamp: timestamp,
      agentName: 'Irrigation Planning Agent',
      agentIcon: '🧠',
      message: `Synthesized all agent factors → Net Score: ${planningAgent.decisionScore} → Decision: ${planningAgent.decision}`,
      status: 'completed',
      details: planningAgent.reasoning,
    },
    {
      id: 'log-5',
      timestamp: timestamp,
      agentName: 'Pump Control Agent',
      agentIcon: '🚰',
      message: `Executed actuator directive → ${pumpAgent.action} (Duty cycle: ${pumpAgent.valveDutyCycle})`,
      status: 'completed',
      details: `Flow: ${pumpAgent.flowRateLitersPerHour} L/hr · Est runtime: ${pumpAgent.recommendedDurationMinutes} mins · Water saved: ${pumpAgent.estimatedWaterSavedLiters.toLocaleString()} L`,
    },
    {
      id: 'log-6',
      timestamp: timestamp,
      agentName: 'Conservation Engine',
      agentIcon: '🌍',
      message: `Verified SDG 6 water conservation metrics → ${conservation.headline}`,
      status: 'completed',
      details: conservation.explanation,
    },
  ];

  return {
    inputs,
    soilAgent,
    weatherAgent,
    cropAgent,
    planningAgent,
    pumpAgent,
    conservation,
    activityLog,
    timestamp,
  };
}

/**
 * Predefined Scenarios (per User Specification)
 */
export const PREDEFINED_SCENARIOS: ScenarioPreset[] = [
  {
    id: 'scenario-1',
    title: 'Scenario 1 — Irrigation Required',
    subtitle: 'Critically Dry Soil + Hot Weather + Flowering Stage',
    tag: 'IRRIGATE',
    inputs: {
      crop: 'Rice',
      growthStage: 'Flowering',
      soilMoisture: 20,
      temperature: 38,
      humidity: 30,
      rainProbability: 10,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'IRRIGATE',
    why: 'Very dry soil (+3), hot & dry weather (+2), high crop requirement (Rice flowering = 90, +2), and low rain chance (+0) yield a high score of 7.',
  },
  {
    id: 'scenario-2',
    title: 'Scenario 2 — Irrigation Should Be Avoided',
    subtitle: 'Sufficient Moisture + Heavy Rain Imminent',
    tag: 'DO NOT IRRIGATE',
    inputs: {
      crop: 'Wheat',
      growthStage: 'Vegetative',
      soilMoisture: 65,
      temperature: 28,
      humidity: 70,
      rainProbability: 80,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'DO NOT IRRIGATE',
    why: 'Soil moisture is sufficient (+0), weather is normal (+0), rain is imminent at 80% (-3), and crop demand is moderate (+1). Net score: -2. Huge water savings!',
  },
  {
    id: 'scenario-3',
    title: 'Scenario 3 — Partial Irrigation',
    subtitle: 'Moderate Soil Deficit + Intermediate Rain Probability',
    tag: 'IRRIGATE PARTIALLY',
    inputs: {
      crop: 'Maize',
      growthStage: 'Vegetative',
      soilMoisture: 40,
      temperature: 32,
      humidity: 50,
      rainProbability: 45,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'IRRIGATE PARTIALLY',
    why: 'Dry soil (+2), normal weather (+0), moderate rain chance (-1), and moderate crop demand (+1). Net score: 2. Controlled pulse irrigation recommended.',
  },
  {
    id: 'scenario-4',
    title: 'Scenario 4 — Tomato',
    subtitle: 'Tomato at Flowering during 41°C Heat Wave',
    tag: 'IRRIGATE',
    inputs: {
      crop: 'Tomato',
      growthStage: 'Flowering',
      soilMoisture: 28,
      temperature: 41,
      humidity: 30,
      rainProbability: 5,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'IRRIGATE',
    why: 'Very dry soil (+3), extreme hot & dry weather (+2), moderate-high crop requirement (Tomato flowering = 65, +1), zero rain chance (0). Score: 6. Urgent irrigation recommended.',
  },
  {
    id: 'scenario-5',
    title: 'Scenario 5 — Cotton',
    subtitle: 'Low Water Requirement + Mild Weather',
    tag: 'DO NOT IRRIGATE',
    inputs: {
      crop: 'Cotton',
      growthStage: 'Maturity',
      soilMoisture: 52,
      temperature: 27,
      humidity: 60,
      rainProbability: 25,
      fieldSizeHectares: 1.0,
    },
    expectedDecision: 'DO NOT IRRIGATE',
    why: 'Moisture is sufficient (52%, +0), mild weather (+0), cotton requirement at maturity is low (45, +0), rain is 25% (0). Score: 0. Water saved for next cycle.',
  },
];

/**
 * Validates agricultural inputs prior to executing analysis
 */
export function validateInputs(inputs: FarmInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!inputs.crop) {
    errors.push('Please select a valid crop type.');
  }

  if (!inputs.growthStage) {
    errors.push('Please select a valid growth stage.');
  }

  if (typeof inputs.soilMoisture !== 'number' || isNaN(inputs.soilMoisture) || inputs.soilMoisture < 0 || inputs.soilMoisture > 100) {
    errors.push('Soil moisture must be a valid percentage between 0% and 100%.');
  }

  if (typeof inputs.temperature !== 'number' || isNaN(inputs.temperature) || inputs.temperature < -10 || inputs.temperature > 65) {
    errors.push('Temperature must be between -10°C and 65°C.');
  }

  if (typeof inputs.humidity !== 'number' || isNaN(inputs.humidity) || inputs.humidity < 0 || inputs.humidity > 100) {
    errors.push('Relative humidity must be between 0% and 100%.');
  }

  if (typeof inputs.rainProbability !== 'number' || isNaN(inputs.rainProbability) || inputs.rainProbability < 0 || inputs.rainProbability > 100) {
    errors.push('Rain probability must be between 0% and 100%.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates that all 5 agents and outputs are completely present before allowing PDF report generation
 */
export function validateAnalysisForReport(result: MultiAgentResult | null): boolean {
  if (!result) return false;
  if (!result.inputs) return false;
  if (!result.soilAgent || !result.soilAgent.status) return false;
  if (!result.weatherAgent || !result.weatherAgent.condition) return false;
  if (!result.cropAgent || !result.cropAgent.waterRequirement) return false;
  if (!result.planningAgent || !result.planningAgent.decision) return false;
  if (!result.pumpAgent || !result.pumpAgent.action) return false;
  if (!result.conservation || !result.conservation.explanation) return false;
  return true;
}

