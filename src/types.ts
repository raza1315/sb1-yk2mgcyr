export interface GameObject {
  x: number;
  y: number;
  charge: 'positive' | 'negative';
  isPlayer?: boolean;
}