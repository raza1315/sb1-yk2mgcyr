import { useState, useEffect, useRef, useCallback } from 'react';
import { GameObject } from '../types';
import { calculateForce } from '../utils/physics';

export function useGameLogic() {
  const [player, setPlayer] = useState<GameObject>({
    x: 50,
    y: 50,
    charge: 'positive',
    isPlayer: true,
  });
  
  const [objects, setObjects] = useState<GameObject[]>([
    { x: 200, y: 200, charge: 'negative' },
    { x: 300, y: 100, charge: 'positive' },
    { x: 150, y: 300, charge: 'negative' },
  ]);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const gameLoopRef = useRef<number>();

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (gameOver) return;
    setIsDragging(true);
  }, [gameOver]);

  const handleDrag = useCallback((e: React.MouseEvent) => {
    if (!isDragging || gameOver) return;
    
    const rect = (e.target as HTMLElement).closest('.relative')?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(0, Math.min(400, e.clientX - rect.left));
    const y = Math.max(0, Math.min(400, e.clientY - rect.top));
    
    setPlayer(prev => ({ ...prev, x, y }));
  }, [isDragging, gameOver]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const togglePolarity = useCallback(() => {
    if (gameOver) return;
    setPlayer(prev => ({
      ...prev,
      charge: prev.charge === 'positive' ? 'negative' : 'positive',
    }));
  }, [gameOver]);

  const resetGame = useCallback(() => {
    setPlayer({
      x: 50,
      y: 50,
      charge: 'positive',
      isPlayer: true,
    });
    setObjects([
      { x: 200, y: 200, charge: 'negative' },
      { x: 300, y: 100, charge: 'positive' },
      { x: 150, y: 300, charge: 'negative' },
    ]);
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || isDragging) return;
      
      const speed = 10; // Increased movement speed
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        switch(e.key) {
          case 'ArrowUp':
            newY = Math.max(0, prev.y - speed);
            break;
          case 'ArrowDown':
            newY = Math.min(400, prev.y + speed);
            break;
          case 'ArrowLeft':
            newX = Math.max(0, prev.x - speed);
            break;
          case 'ArrowRight':
            newX = Math.min(400, prev.x + speed);
            break;
          case ' ':
            togglePolarity();
            break;
        }
        
        return { ...prev, x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isDragging, togglePolarity]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const updateGame = () => {
      if (gameOver) return;

      setObjects(prevObjects => {
        return prevObjects.map(obj => {
          const { dx, dy, distance, force } = calculateForce(player, obj);
          
          if (distance < 20) {
            if (obj.charge !== player.charge) {
              setScore(prev => prev + 1);
              return {
                ...obj,
                x: Math.random() * 380 + 10,
                y: Math.random() * 380 + 10,
                charge: Math.random() > 0.5 ? 'positive' : 'negative',
              };
            } else {
              setGameOver(true);
              return obj;
            }
          }

          // Enhanced magnetic attraction/repulsion
          const strength = force * (50 / Math.pow(distance, 1.5)); // Increased strength and adjusted falloff
          const snapDistance = 40; // Distance at which particles snap to the magnet
          
          let newX = obj.x;
          let newY = obj.y;

          if (distance < snapDistance && obj.charge !== player.charge) {
            // Snap to magnet if opposite charge and close enough
            const snapStrength = 0.2;
            newX = obj.x + (dx * snapStrength);
            newY = obj.y + (dy * snapStrength);
          } else {
            // Normal magnetic force
            newX = obj.x + (dx / distance) * strength;
            newY = obj.y + (dy / distance) * strength;
          }

          // Keep particles within bounds
          newX = Math.max(0, Math.min(400, newX));
          newY = Math.max(0, Math.min(400, newY));

          return {
            ...obj,
            x: newX,
            y: newY,
          };
        });
      });
    };

    gameLoopRef.current = setInterval(updateGame, 16);
    return () => clearInterval(gameLoopRef.current);
  }, [player, gameOver]);

  return {
    player,
    objects,
    score,
    gameOver,
    timeLeft,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    togglePolarity,
    resetGame,
  };
}