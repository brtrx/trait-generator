// Archetype categories and definitions for "Who Am I Most Like" feature
import { ValueScores, getTopValues, calculateHigherOrderScores, HigherOrderValue } from './schwartz-values';

export type ArchetypeCategory = 
  | 'fictional' 
  | 'historical' 
  | 'superheroes' 
  | 'mythological' 
  | 'literary';

export interface Archetype {
  name: string;
  description: string;
  imagePrompt: string;
  primaryValues: string[];
  secondaryPattern?: Partial<Record<HigherOrderValue, 'high' | 'low'>>;
  category: ArchetypeCategory;
}

export const ARCHETYPE_CATEGORIES: { value: ArchetypeCategory; label: string; description: string }[] = [
  { value: 'fictional', label: 'Fictional Characters', description: 'Popular characters from movies and TV' },
  { value: 'historical', label: 'Historical Figures', description: 'Notable people from history (non-living)' },
  { value: 'superheroes', label: 'Superheroes & Comics', description: 'Heroes and villains from comic books' },
  { value: 'mythological', label: 'Gods & Mythology', description: 'Deities and supernatural beings' },
  { value: 'literary', label: 'Literary Characters', description: 'Characters from famous novels' },
];

export const ARCHETYPES: Archetype[] = [
  // Fictional Characters (default)
  {
    name: 'Dumbledore',
    description: 'A wise mentor who prioritizes the greater good while nurturing individual growth. Values wisdom, tolerance, and benevolence above personal power.',
    imagePrompt: 'A wise elderly wizard with long silver beard, half-moon spectacles, wearing flowing purple robes, serene and knowing expression, magical atmosphere, portrait style',
    primaryValues: ['UNC', 'UNT', 'BEC', 'SDT'],
    secondaryPattern: { 'self-transcendence': 'high', 'self-enhancement': 'low' },
    category: 'fictional',
  },
  {
    name: 'Hermione Granger',
    description: 'A devoted scholar who values knowledge, rules, and loyalty to friends. Combines intellectual curiosity with dependability.',
    imagePrompt: 'A young woman with bushy brown hair, intelligent determined expression, holding books, wearing academic robes, warm lighting, portrait style',
    primaryValues: ['SDT', 'COR', 'BED', 'ACM'],
    secondaryPattern: { 'openness': 'high', 'conservation': 'high' },
    category: 'fictional',
  },
  {
    name: 'Leslie Knope',
    description: 'An enthusiastic public servant who combines ambition with genuine care for community. Balances achievement with benevolence.',
    imagePrompt: 'A cheerful blonde woman in professional attire, bright optimistic smile, holding a binder, government office background, warm positive energy, portrait style',
    primaryValues: ['BEC', 'ACM', 'SES', 'BED'],
    secondaryPattern: { 'self-transcendence': 'high', 'self-enhancement': 'high' },
    category: 'fictional',
  },
  {
    name: 'Spock',
    description: 'A logical mind who values truth and duty over emotion. Prioritizes intellectual self-direction while maintaining conformity to principles.',
    imagePrompt: 'A stoic Vulcan with pointed ears, raised eyebrow, wearing blue science officer uniform, calm logical expression, starship interior, portrait style',
    primaryValues: ['SDT', 'COR', 'HUM', 'ACM'],
    secondaryPattern: { 'openness': 'high', 'self-enhancement': 'low' },
    category: 'fictional',
  },
  {
    name: 'Tony Stark',
    description: 'A brilliant innovator who pursues excellence and independence. Combines achievement drive with creative self-direction.',
    imagePrompt: 'A charismatic man with goatee in high-tech workshop, confident smirk, surrounded by holographic displays and technology, modern sleek environment, portrait style',
    primaryValues: ['ACM', 'SDT', 'SDA', 'STI'],
    secondaryPattern: { 'openness': 'high', 'self-enhancement': 'high' },
    category: 'fictional',
  },

  // Historical Figures
  {
    name: 'Marcus Aurelius',
    description: 'A philosopher-emperor who valued wisdom, duty, and self-mastery. Combined power with humility and dedication to the common good.',
    imagePrompt: 'A Roman emperor in simple white toga, contemplative expression, holding a scroll, marble columns background, dignified and thoughtful, classical portrait style',
    primaryValues: ['SDT', 'HUM', 'UNC', 'COR'],
    secondaryPattern: { 'self-transcendence': 'high', 'openness': 'high' },
    category: 'historical',
  },
  {
    name: 'Leonardo da Vinci',
    description: 'A Renaissance polymath driven by insatiable curiosity and creative vision. Valued knowledge, innovation, and artistic excellence.',
    imagePrompt: 'A Renaissance artist with long hair and beard, holding drawing tools, surrounded by sketches and inventions, workshop setting, inquisitive genius, portrait style',
    primaryValues: ['SDT', 'STI', 'ACM', 'UNN'],
    secondaryPattern: { 'openness': 'high', 'self-enhancement': 'high' },
    category: 'historical',
  },
  {
    name: 'Florence Nightingale',
    description: 'A pioneering nurse who revolutionized healthcare through compassion and methodical reform. Valued caring for others and social improvement.',
    imagePrompt: 'A Victorian woman in nursing attire holding a lamp, compassionate determined expression, hospital ward background, warm candlelight, portrait style',
    primaryValues: ['BEC', 'UNC', 'COR', 'ACM'],
    secondaryPattern: { 'self-transcendence': 'high', 'conservation': 'high' },
    category: 'historical',
  },
  {
    name: 'Mahatma Gandhi',
    description: 'A leader who championed non-violence and justice through humble service. Valued universal concern, tradition, and principled action.',
    imagePrompt: 'An elderly Indian man in simple white dhoti, round glasses, peaceful serene expression, sitting in meditation pose, soft natural lighting, portrait style',
    primaryValues: ['UNC', 'UNT', 'HUM', 'TRD'],
    secondaryPattern: { 'self-transcendence': 'high', 'self-enhancement': 'low' },
    category: 'historical',
  },
  {
    name: 'Cleopatra',
    description: 'A strategic ruler who combined political power with cultural sophistication. Valued influence, achievement, and protecting her realm.',
    imagePrompt: 'An Egyptian queen with elaborate headdress and gold jewelry, commanding regal presence, palace throne room, luxurious and powerful, portrait style',
    primaryValues: ['POD', 'ACM', 'SES', 'SDT'],
    secondaryPattern: { 'self-enhancement': 'high', 'conservation': 'high' },
    category: 'historical',
  },

  // Superheroes & Comics
  {
    name: 'Captain America',
    description: 'A principled leader who embodies duty, tradition, and selfless service. Balances conformity to ideals with fierce protection of others.',
    imagePrompt: 'A heroic super soldier with star-spangled shield, determined noble expression, patriotic red white and blue costume, heroic pose, dramatic lighting, portrait style',
    primaryValues: ['BED', 'COR', 'TRD', 'SES'],
    secondaryPattern: { 'conservation': 'high', 'self-transcendence': 'high' },
    category: 'superheroes',
  },
  {
    name: 'Wonder Woman',
    description: 'A warrior princess who fights for justice and compassion. Combines strength with empathy and a deep commitment to peace.',
    imagePrompt: 'An Amazonian warrior princess with golden tiara and silver bracelets, powerful yet compassionate expression, flowing dark hair, heroic stance, portrait style',
    primaryValues: ['UNC', 'BEC', 'POD', 'TRD'],
    secondaryPattern: { 'self-transcendence': 'high', 'self-enhancement': 'high' },
    category: 'superheroes',
  },
  {
    name: 'Batman',
    description: 'A vigilante driven by justice and self-discipline. Values security, achievement, and independent action over social conformity.',
    imagePrompt: 'A dark knight in black cape and cowl, intense brooding expression, gothic cityscape background, shadows and moonlight, mysterious and powerful, portrait style',
    primaryValues: ['SDA', 'ACM', 'SEO', 'POD'],
    secondaryPattern: { 'self-enhancement': 'high', 'openness': 'high' },
    category: 'superheroes',
  },
  {
    name: 'Spider-Man',
    description: 'A hero who balances personal responsibility with youthful energy. Values helping others while maintaining his own identity and relationships.',
    imagePrompt: 'A young hero in red and blue spider suit, dynamic pose, urban rooftop setting, energetic and friendly, web-slinging action, portrait style',
    primaryValues: ['BEC', 'BED', 'SDA', 'STI'],
    secondaryPattern: { 'self-transcendence': 'high', 'openness': 'high' },
    category: 'superheroes',
  },
  {
    name: "T'Challa (Black Panther)",
    description: 'A thoughtful leader who balances tradition with progress. Values security and heritage while remaining open to change.',
    imagePrompt: 'An African king in sleek black vibranium suit, regal dignified expression, advanced technological throne room, powerful and wise, portrait style',
    primaryValues: ['TRD', 'SES', 'UNC', 'SDA'],
    secondaryPattern: { 'conservation': 'high', 'openness': 'high' },
    category: 'superheroes',
  },

  // Gods & Mythology
  {
    name: 'Athena',
    description: 'Goddess of wisdom and strategic warfare. Values knowledge, justice, and calculated action over impulsive behavior.',
    imagePrompt: 'A Greek goddess in gleaming armor with owl companion, wise piercing gaze, olive branch and spear, Parthenon background, divine and strategic, portrait style',
    primaryValues: ['SDT', 'UNC', 'ACM', 'COR'],
    secondaryPattern: { 'openness': 'high', 'self-enhancement': 'high' },
    category: 'mythological',
  },
  {
    name: 'Odin',
    description: 'The All-Father who sacrificed for wisdom and leads with ancient knowledge. Values wisdom, tradition, and protecting the cosmic order.',
    imagePrompt: 'A one-eyed Norse god with long grey beard, ravens on shoulders, holding magical spear, throne of Asgard, wise and powerful, portrait style',
    primaryValues: ['SDT', 'TRD', 'POD', 'SES'],
    secondaryPattern: { 'conservation': 'high', 'openness': 'high' },
    category: 'mythological',
  },
  {
    name: 'Aphrodite',
    description: 'Goddess of love and beauty who values pleasure, connection, and aesthetic experience. Embraces hedonism and interpersonal harmony.',
    imagePrompt: 'A beautiful Greek goddess emerging from sea foam, radiant loving expression, surrounded by roses and doves, golden light, ethereal and sensual, portrait style',
    primaryValues: ['HED', 'COI', 'BEC', 'FAC'],
    secondaryPattern: { 'openness': 'high', 'self-enhancement': 'high' },
    category: 'mythological',
  },
  {
    name: 'Prometheus',
    description: 'The fire-bringer who defied gods to help humanity. Values universal concern, independent action, and progress over tradition.',
    imagePrompt: 'A Titan holding blazing fire, defiant noble expression, rocky mountain setting, dramatic storm clouds, rebellious and heroic, portrait style',
    primaryValues: ['UNC', 'SDA', 'STI', 'HUM'],
    secondaryPattern: { 'self-transcendence': 'high', 'conservation': 'low' },
    category: 'mythological',
  },
  {
    name: 'Kuan Yin',
    description: 'Bodhisattva of compassion who embodies infinite mercy. Values caring for all beings, humility, and tolerance above personal gain.',
    imagePrompt: 'A serene Asian goddess in flowing white robes, gentle compassionate smile, lotus flowers, soft golden aura, peaceful and merciful, portrait style',
    primaryValues: ['BEC', 'UNC', 'HUM', 'UNT'],
    secondaryPattern: { 'self-transcendence': 'high', 'self-enhancement': 'low' },
    category: 'mythological',
  },

  // Literary Characters
  {
    name: 'Elizabeth Bennet',
    description: 'A witty heroine who values independence of thought and challenges social conventions. Combines intelligence with warmth and moral integrity.',
    imagePrompt: 'A Regency-era young woman in elegant empire-waist dress, clever sparkling eyes, amused knowing smile, English countryside estate, portrait style',
    primaryValues: ['SDT', 'SDA', 'BED', 'HUM'],
    secondaryPattern: { 'openness': 'high', 'self-transcendence': 'high' },
    category: 'literary',
  },
  {
    name: 'Gandalf',
    description: 'A humble guide who empowers others while maintaining ancient wisdom. Values nature, tolerance, and gentle influence over control.',
    imagePrompt: 'A wise wizard in grey robes with tall pointed hat, long grey beard, staff in hand, gentle knowing eyes, misty forest background, portrait style',
    primaryValues: ['UNN', 'UNT', 'HUM', 'SDT'],
    secondaryPattern: { 'self-transcendence': 'high', 'self-enhancement': 'low' },
    category: 'literary',
  },
  {
    name: 'Atticus Finch',
    description: 'A moral compass who stands for justice against popular opinion. Values fairness, integrity, and teaching by example.',
    imagePrompt: 'A dignified Southern lawyer in 1930s suit and suspenders, kind thoughtful expression, courthouse setting, integrity and wisdom, portrait style',
    primaryValues: ['UNC', 'UNT', 'BED', 'COR'],
    secondaryPattern: { 'self-transcendence': 'high', 'conservation': 'high' },
    category: 'literary',
  },
  {
    name: 'Sherlock Holmes',
    description: 'A brilliant detective driven by intellectual challenge. Values knowledge, independent thinking, and achievement through deduction.',
    imagePrompt: 'A Victorian detective with deerstalker cap and magnifying glass, intense analytical gaze, Baker Street study with chemistry equipment, enigmatic and brilliant, portrait style',
    primaryValues: ['SDT', 'STI', 'ACM', 'SDA'],
    secondaryPattern: { 'openness': 'high', 'self-enhancement': 'high' },
    category: 'literary',
  },
  {
    name: 'Jane Eyre',
    description: 'An independent spirit who maintains her principles despite adversity. Values self-respect, moral integrity, and genuine connection.',
    imagePrompt: 'A Victorian governess in plain dark dress, determined resilient expression, candlelit room with books, quiet strength and dignity, portrait style',
    primaryValues: ['SDA', 'SDT', 'BED', 'HUM'],
    secondaryPattern: { 'openness': 'high', 'self-transcendence': 'high' },
    category: 'literary',
  },
];

function calculateArchetypeMatch(scores: ValueScores, archetype: Archetype): number {
  let score = 0;
  
  const topValues = getTopValues(scores, 6).map(v => v.code);
  archetype.primaryValues.forEach((code, index) => {
    const position = topValues.indexOf(code);
    if (position !== -1) {
      score += (6 - position) * 2;
    }
  });
  
  if (archetype.secondaryPattern) {
    const hoScores = calculateHigherOrderScores(scores);
    const hoArray = Object.entries(hoScores).sort((a, b) => b[1] - a[1]);
    const highHO = hoArray[0][0] as HigherOrderValue;
    const lowHO = hoArray[hoArray.length - 1][0] as HigherOrderValue;
    
    if (archetype.secondaryPattern[highHO] === 'high') score += 3;
    if (archetype.secondaryPattern[lowHO] === 'low') score += 3;
  }
  
  return score;
}

export function findBestArchetype(scores: ValueScores, category: ArchetypeCategory): Archetype {
  const categoryArchetypes = ARCHETYPES.filter(a => a.category === category);
  
  let bestArchetype = categoryArchetypes[0];
  let bestScore = -Infinity;
  
  categoryArchetypes.forEach(archetype => {
    const matchScore = calculateArchetypeMatch(scores, archetype);
    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestArchetype = archetype;
    }
  });
  
  return bestArchetype;
}

export function getMatchingValues(scores: ValueScores, archetype: Archetype): string[] {
  const topValues = getTopValues(scores, 6);
  return archetype.primaryValues
    .filter(code => topValues.some(v => v.code === code))
    .slice(0, 3);
}
