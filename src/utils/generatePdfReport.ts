import { jsPDF } from 'jspdf';
import { MultiAgentResult } from '../types/irrigation';

/**
 * Generates a clean, professional, publication-grade ONE-PAGE PDF agricultural assessment report.
 * Strictly formatted to fit on a single A4 page (210 x 297 mm).
 */
export function generateOnePagePdfReport(result: MultiAgentResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const { inputs, soilAgent, weatherAgent, cropAgent, planningAgent, pumpAgent, conservation } = result;

  // Palette constants
  const forestGreen: [number, number, number] = [15, 56, 34]; // #0F3822
  const agriGreen: [number, number, number] = [22, 101, 52]; // #166534
  const emeraldAccent: [number, number, number] = [16, 185, 129];
  const waterBlue: [number, number, number] = [2, 132, 199]; // #0284C7
  const softAmber: [number, number, number] = [217, 119, 6];
  const softRed: [number, number, number] = [220, 38, 38];
  const darkCharcoal: [number, number, number] = [15, 41, 30]; // #0F291E
  const textMuted: [number, number, number] = [100, 116, 139];
  const bgOffWhite: [number, number, number] = [248, 250, 248];
  const borderLight: [number, number, number] = [226, 232, 226];

  const leftMargin = 12;
  const pageWidth = 210;
  const contentWidth = pageWidth - leftMargin * 2; // 186 mm

  // ==========================================
  // 1. TOP HEADER & BRANDING (y = 12 to 34)
  // ==========================================
  doc.setFillColor(...forestGreen);
  doc.roundedRect(leftMargin, 12, contentWidth, 22, 2.5, 2.5, 'F');

  // Title text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SMART IRRIGATION AGENT', leftMargin + 6, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(190, 242, 200);
  doc.text('Agentic AI Agricultural Water Assessment Report', leftMargin + 6, 26);

  // Status badge & timestamp on right
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const currentTime = result.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - leftMargin - 52, 16, 46, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...forestGreen);
  doc.text('STATUS: COMPLETED', pageWidth - leftMargin - 49, 20.3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(220, 252, 231);
  doc.text(`Generated: ${currentDate} · ${currentTime}`, pageWidth - leftMargin - 52, 28);

  // ==========================================
  // 2. MULTI-AGENT PIPELINE STRIP (y = 38 to 47)
  // ==========================================
  doc.setFillColor(242, 248, 243);
  doc.setDrawColor(...borderLight);
  doc.roundedRect(leftMargin, 37, contentWidth, 10, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...agriGreen);
  doc.text('MULTI-AGENT DECISION PIPELINE:', leftMargin + 4, 43.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkCharcoal);
  const pipelineFlow = 'SOIL AGENT  →  WEATHER AGENT  →  CROP AGENT  →  AI PLANNING AGENT  →  PUMP ACTION';
  doc.text(pipelineFlow, leftMargin + 54, 43.5);

  // ==========================================
  // 3. SECTION A: FARM / INPUT SUMMARY (y = 50 to 86)
  // ==========================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...forestGreen);
  doc.text('A. FARM CONDITIONS & SENSOR INPUTS', leftMargin, 53);

  // 6 parameter cards in a 6-column grid
  const colWidth = (contentWidth - 5 * 2.5) / 6;
  const inputParams = [
    { label: 'CROP', val: inputs.crop },
    { label: 'GROWTH STAGE', val: inputs.growthStage },
    { label: 'SOIL MOISTURE', val: `${inputs.soilMoisture}%` },
    { label: 'TEMPERATURE', val: `${inputs.temperature}°C` },
    { label: 'HUMIDITY', val: `${inputs.humidity}%` },
    { label: 'RAIN PROB', val: `${inputs.rainProbability}%` },
  ];

  inputParams.forEach((param, idx) => {
    const xPos = leftMargin + idx * (colWidth + 2.5);
    doc.setFillColor(...bgOffWhite);
    doc.setDrawColor(...borderLight);
    doc.roundedRect(xPos, 56, colWidth, 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(param.label, xPos + colWidth / 2, 61, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...darkCharcoal);
    doc.text(param.val, xPos + colWidth / 2, 68, { align: 'center' });
  });

  // ==========================================
  // 4. SECTION B: MULTI-AGENT ANALYSIS (y = 77 to 142)
  // ==========================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...forestGreen);
  doc.text('B. MULTI-AGENT ANALYSIS SUMMARY', leftMargin, 77);

  // 5 Agent rows / mini-cards
  const agentCards = [
    {
      name: '1. Soil Moisture Agent',
      status: soilAgent.status.toUpperCase(),
      statusColor: soilAgent.status === 'Very Dry' ? softRed : soilAgent.status === 'Dry' ? softAmber : agriGreen,
      score: `Score: ${soilAgent.scoreContribution > 0 ? '+' + soilAgent.scoreContribution : '0'} pts`,
      finding: soilAgent.analysis,
    },
    {
      name: '2. Weather Agent',
      status: weatherAgent.condition.toUpperCase(),
      statusColor: weatherAgent.condition === 'Hot and Dry' ? softAmber : weatherAgent.condition === 'Rain Expected' ? waterBlue : agriGreen,
      score: `Demand: ${weatherAgent.evaporativeDemand} (${weatherAgent.rainScoreContribution < 0 ? weatherAgent.rainScoreContribution + ' rain discount' : 'no rain discount'})`,
      finding: weatherAgent.analysis,
    },
    {
      name: '3. Crop Requirement Agent',
      status: `${cropAgent.level.toUpperCase()} DEMAND (INDEX ${cropAgent.waterRequirement})`,
      statusColor: cropAgent.level === 'High' ? softRed : cropAgent.level === 'Moderate' ? softAmber : agriGreen,
      score: `Weight: +${cropAgent.scoreContribution} pts`,
      finding: cropAgent.analysis,
    },
    {
      name: '4. Irrigation Planning Agent',
      status: `${planningAgent.decision} (SCORE: ${planningAgent.decisionScore})`,
      statusColor: planningAgent.decision === 'IRRIGATE' ? waterBlue : planningAgent.decision === 'IRRIGATE PARTIALLY' ? softAmber : agriGreen,
      score: planningAgent.thresholdMet,
      finding: planningAgent.reasoning,
    },
    {
      name: '5. Pump Control Agent',
      status: `PUMP ${pumpAgent.pumpStatus}`,
      statusColor: pumpAgent.pumpStatus === 'ON' ? waterBlue : agriGreen,
      score: `Flow: ${pumpAgent.flowRateLitersPerHour.toLocaleString()} L/hr · Est: ${pumpAgent.recommendedDurationMinutes} mins`,
      finding: `${pumpAgent.action} (Duty cycle: ${pumpAgent.valveDutyCycle})`,
    },
  ];

  let currentY = 81;
  agentCards.forEach((agent) => {
    doc.setFillColor(...bgOffWhite);
    doc.setDrawColor(...borderLight);
    doc.roundedRect(leftMargin, currentY, contentWidth, 11.5, 1.2, 1.2, 'FD');

    // Agent name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...forestGreen);
    doc.text(agent.name, leftMargin + 3.5, currentY + 4.5);

    // Status pill
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...agent.statusColor);
    doc.text(agent.status, leftMargin + 50, currentY + 4.5);

    // Score / metric
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(agent.score, pageWidth - leftMargin - 3.5, currentY + 4.5, { align: 'right' });

    // Finding text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...darkCharcoal);
    const splitFinding = doc.splitTextToSize(agent.finding, contentWidth - 7);
    doc.text(splitFinding[0] || '', leftMargin + 3.5, currentY + 8.8);

    currentY += 13;
  });

  // ==========================================
  // 5. SECTION C: FINAL IRRIGATION DECISION (y = 148 to 186)
  // ==========================================
  const decisionThemeColor =
    planningAgent.decision === 'IRRIGATE' ? waterBlue : planningAgent.decision === 'IRRIGATE PARTIALLY' ? softAmber : agriGreen;

  doc.setFillColor(242, 249, 244);
  doc.setDrawColor(...decisionThemeColor);
  doc.setLineWidth(0.6);
  doc.roundedRect(leftMargin, 148, contentWidth, 36, 2.5, 2.5, 'FD');
  doc.setLineWidth(0.2); // reset

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('C. FINAL IRRIGATION DECISION', leftMargin + 5, 154);

  // Big Decision text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...decisionThemeColor);
  doc.text(planningAgent.decision, leftMargin + 5, 163);

  // Pump Recommendation banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkCharcoal);
  doc.text(`Action: ${pumpAgent.action}`, leftMargin + 5, 169);

  // Decision Reason prose
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...darkCharcoal);
  const reasonLines = doc.splitTextToSize(
    `Reason: ${planningAgent.reasoning}`,
    contentWidth - 10
  );
  doc.text(reasonLines.slice(0, 2), leftMargin + 5, 175);

  // Water volume metrics on right side
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...forestGreen);
  doc.text(`Volume: ${pumpAgent.estimatedWaterUsageLiters.toLocaleString()} L`, pageWidth - leftMargin - 6, 161, { align: 'right' });
  doc.text(`Duration: ${pumpAgent.recommendedDurationMinutes} mins`, pageWidth - leftMargin - 6, 166, { align: 'right' });
  doc.setTextColor(...agriGreen);
  doc.text(`Conserved: ${pumpAgent.estimatedWaterSavedLiters > 0 ? '+' + pumpAgent.estimatedWaterSavedLiters.toLocaleString() + ' L' : '0 L (Optimal)'}`, pageWidth - leftMargin - 6, 171, { align: 'right' });

  // ==========================================
  // 6. SECTION D: WATER CONSERVATION RECOMMENDATION (y = 188 to 222)
  // ==========================================
  doc.setFillColor(...bgOffWhite);
  doc.setDrawColor(...borderLight);
  doc.roundedRect(leftMargin, 188, contentWidth, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...forestGreen);
  doc.text('D. WATER CONSERVATION RECOMMENDATION', leftMargin + 5, 194);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...agriGreen);
  doc.text(conservation.headline, leftMargin + 5, 200);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...darkCharcoal);
  const conservationLines = doc.splitTextToSize(conservation.explanation, contentWidth - 10);
  doc.text(conservationLines.slice(0, 3), leftMargin + 5, 205);

  // ==========================================
  // 7. SECTION E: AUDIT FACTORS (y = 224 to 254)
  // ==========================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...forestGreen);
  doc.text('E. DECISION FACTOR SCORING AUDIT', leftMargin, 226);

  const factorColWidth = (contentWidth - 3 * 3) / 4;
  planningAgent.factors.forEach((f, fIdx) => {
    const fX = leftMargin + fIdx * (factorColWidth + 3);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderLight);
    doc.roundedRect(fX, 228.5, factorColWidth, 18, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(f.factor.toUpperCase(), fX + 2.5, 233);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    const pColor = f.points > 0 ? agriGreen : f.points < 0 ? waterBlue : darkCharcoal;
    doc.setTextColor(...pColor);
    doc.text(f.points > 0 ? `+${f.points} pts` : `${f.points} pts`, fX + factorColWidth - 2.5, 233, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(...darkCharcoal);
    const shortText = doc.splitTextToSize(f.impactText, factorColWidth - 5);
    doc.text(shortText.slice(0, 2), fX + 2.5, 238);
  });

  // ==========================================
  // 8. SECTION F: FOOTER, SDGS & DISCLAIMER (y = 252 to 285)
  // ==========================================
  doc.setDrawColor(...borderLight);
  doc.line(leftMargin, 252, pageWidth - leftMargin, 252);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...forestGreen);
  doc.text('Smart Irrigation Agent · Agentic AI for Intelligent Water Conservation in Agriculture', leftMargin, 257);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...agriGreen);
  doc.text('UN SDGs: SDG 6 (Clean Water) · SDG 2 (Zero Hunger) · SDG 12 (Responsible Production) · SDG 13 (Climate Action)', leftMargin, 262);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(...textMuted);
  const disclaimer = 'Disclaimer: This prototype provides an AI-assisted irrigation recommendation based on supplied agricultural conditions. Actual irrigation decisions should consider field-specific sensor measurements, soil salinity, and professional agronomic guidance.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, leftMargin, 267);

  // Save PDF file
  doc.save('Smart_Irrigation_Agent_Report.pdf');
}
