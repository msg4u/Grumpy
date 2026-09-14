export type AppTab = 
  | 'story' 
  | 'experiment' 
  | 'simulator' 
  | 'emotions' 
  | 'creative' 
  | 'parent-guide' 
  | 'minigame';

export interface StoryScene {
  id: number;
  title: string;
  stageName: string;
  angerLevel: number; // 0 to 100
  grumpyFace: 'sleeping' | 'annoyed' | 'boiling' | 'exploding' | 'relieved';
  flowerState: 'healthy' | 'fine' | 'wet' | 'knocked' | 'reborn';
  hatOn: boolean;
  cloudState: 'none' | 'sneaking' | 'raining' | 'stormy' | 'fleeing';
  text: string;
  dialogue?: string;
  childActionPrompt: string;
  soundCue?: string;
}

export interface ExperimentMaterial {
  id: string;
  name: string;
  amount: string;
  role: string;
  iconName: string;
  checked: boolean;
  tip?: string;
}

export interface ConstructionStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  instructions: string[];
  kidRole: string;
  adultRole: string;
  warning?: string;
  icon: string;
}

export interface EmotionQuizItem {
  id: string;
  question: string;
  scenario: string;
  options: {
    text: string;
    isHealthy: boolean;
    feedback: string;
    emoji: string;
  }[];
}
