export interface Opportunity {
  id: string;
  title: string;
  category: string;
  country: string;
  description: string;
  difficulty: 'Low' | 'Medium' | 'High';
  cost: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  skillLevel: 'Low' | 'Medium' | 'High';
  sources: string[];
}

export interface FilterState {
  category: string;
  country: string;
  maxDifficulty: string;
  maxCost: string;
  maxSkillLevel: string;
}

export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';
