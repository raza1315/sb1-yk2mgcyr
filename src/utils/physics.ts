import { GameObject } from '../types';

export function calculateForce(player: GameObject, obj: GameObject) {
  const dx = player.x - obj.x;
  const dy = player.y - obj.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const force = player.charge === obj.charge ? -1 : 1;

  return { dx, dy, distance, force };
}