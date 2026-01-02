// Deterministic profile description and system prompt generator
import { 
  SCHWARTZ_VALUES, 
  ValueScores, 
  getTopValues, 
  getBottomValues, 
  getValueByCode,
  calculateHigherOrderScores,
  HigherOrderValue 
} from './schwartz-values';

function detectTensions(scores: ValueScores): string[] {
  const tensions: string[] = [];
  const hoScores = calculateHigherOrderScores(scores);
  
  // Check for opposing high scores
  if (hoScores['self-enhancement'] > 4.0 && hoScores['self-transcendence'] > 4.0) {
    tensions.push('high Power values alongside high Benevolence, suggesting a complex leader who seeks influence to help others');
  }
  
  if (hoScores['openness'] > 4.0 && hoScores['conservation'] > 4.0) {
    tensions.push('strong Openness combined with Conservation values, indicating someone who innovates within established frameworks');
  }
  
  // Check specific value tensions
  const pod = scores['POD'] ?? 3.5;
  const bec = scores['BEC'] ?? 3.5;
  if (pod > 4.5 && bec > 4.5) {
    tensions.push('unusually high Power-dominance paired with Benevolence-caring, suggesting protective or parental leadership');
  }
  
  const sda = scores['SDA'] ?? 3.5;
  const cor = scores['COR'] ?? 3.5;
  if (sda > 4.5 && cor > 4.5) {
    tensions.push('valuing both independent action and rule-following, potentially indicating selective conformity');
  }
  
  return tensions;
}

export function generateDescription(scores: ValueScores): string {
  const topValues = getTopValues(scores, 3);
  const bottomValues = getBottomValues(scores, 3);
  const tensions = detectTensions(scores);
  
  // Build the description as plain text (no markdown)
  const topLabels = topValues.map(v => v.label);
  let description = `This profile shows strongest emphasis on ${topLabels[0]} (${scores[topValues[0].code]?.toFixed(2)}), `;
  description += `${topLabels[1]} (${scores[topValues[1].code]?.toFixed(2)}), and `;
  description += `${topLabels[2]} (${scores[topValues[2].code]?.toFixed(2)}). `;
  
  // Describe what top values mean
  description += `This suggests someone who ${getTopValueMeaning(topValues)}.`;
  
  // Bottom values
  const bottomLabels = bottomValues.map(v => v.label);
  description += ` Less emphasized are ${bottomLabels[0]} (${scores[bottomValues[0].code]?.toFixed(2)}), `;
  description += `${bottomLabels[1]} (${scores[bottomValues[1].code]?.toFixed(2)}), and `;
  description += `${bottomLabels[2]} (${scores[bottomValues[2].code]?.toFixed(2)}). `;
  description += `This indicates ${getBottomValueMeaning(bottomValues)}.`;
  
  // Tensions
  if (tensions.length > 0) {
    description += ` Notable patterns: ${tensions[0]}.`;
  }
  
  return description;
}

function getTopValueMeaning(topValues: ReturnType<typeof getTopValues>): string {
  const codes = topValues.map(v => v.code);
  
  if (codes.includes('UNC') || codes.includes('UNT') || codes.includes('UNN')) {
    return 'prioritizes universal welfare and embraces diverse perspectives';
  }
  if (codes.includes('BEC') || codes.includes('BED')) {
    return 'deeply values close relationships and being there for loved ones';
  }
  if (codes.includes('SDT') || codes.includes('SDA')) {
    return 'treasures autonomy and the freedom to think and act independently';
  }
  if (codes.includes('ACM') || codes.includes('POD')) {
    return 'is driven by achievement and the desire to excel';
  }
  if (codes.includes('TRD') || codes.includes('COR')) {
    return 'values tradition, order, and adherence to established norms';
  }
  if (codes.includes('SEO') || codes.includes('SES')) {
    return 'prioritizes safety, stability, and security in life';
  }
  
  return 'has a distinctive combination of motivational priorities';
}

function getBottomValueMeaning(bottomValues: ReturnType<typeof getBottomValues>): string {
  const codes = bottomValues.map(v => v.code);
  
  if (codes.includes('POD') || codes.includes('POR')) {
    return 'less concern with accumulating power or material resources';
  }
  if (codes.includes('HED') || codes.includes('STI')) {
    return 'a more measured approach to pleasure-seeking and novelty';
  }
  if (codes.includes('TRD') || codes.includes('COR')) {
    return 'flexibility regarding traditional expectations and rules';
  }
  if (codes.includes('FAC') || codes.includes('HUM')) {
    return 'less focus on social image or excessive modesty';
  }
  
  return 'particular areas receiving less motivational emphasis';
}
export function generateSystemPrompt(scores: ValueScores): string {
  let prompt = 'You are an AI assistant with the following values based on a PVQ-RR survey:\n\n';
  
  SCHWARTZ_VALUES.forEach(value => {
    const score = scores[value.code] ?? 3.5;
    prompt += `${value.code}: ${value.label} (Score: ${score.toFixed(2)})\n`;
  });
  
  prompt += '\n---\n\n';
  prompt += 'Behavioral Guidelines:\n';
  
  // Add behavioral guidance based on top values
  const topValues = getTopValues(scores, 3);
  const bottomValues = getBottomValues(scores, 3);
  
  prompt += `- Strongly emphasize: ${topValues.map(v => v.label).join(', ')}\n`;
  prompt += `- De-emphasize: ${bottomValues.map(v => v.label).join(', ')}\n`;
  
  // Add specific behavioral notes
  const hoScores = calculateHigherOrderScores(scores);
  const dominantHO = Object.entries(hoScores).sort((a, b) => b[1] - a[1])[0][0];
  
  switch (dominantHO) {
    case 'self-transcendence':
      prompt += '- Prioritize others\' wellbeing and consider diverse perspectives\n';
      prompt += '- Show empathy and concern for justice and equality\n';
      break;
    case 'openness':
      prompt += '- Encourage creative thinking and independent exploration\n';
      prompt += '- Embrace novelty and support autonomous decision-making\n';
      break;
    case 'conservation':
      prompt += '- Respect established norms and provide stable, reliable guidance\n';
      prompt += '- Value tradition and consider security implications\n';
      break;
    case 'self-enhancement':
      prompt += '- Focus on excellence, achievement, and measurable success\n';
      prompt += '- Provide confident, decisive guidance\n';
      break;
  }
  
  return prompt;
}

export function generateBoth(scores: ValueScores): { description: string; systemPrompt: string } {
  return {
    description: generateDescription(scores),
    systemPrompt: generateSystemPrompt(scores),
  };
}
