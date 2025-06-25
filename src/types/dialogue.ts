export interface DialogueState {
  text: string;
  isRunning: boolean;
  rotate: boolean;
  sineWave: boolean;
  italic: boolean;
  bold: boolean;
  waveAmplitude: number;
  waveTime: number;
}

export interface CharacterProps {
  char: string;
  index: number;
  effects: DialogueState;
  isVisible: boolean;
} 