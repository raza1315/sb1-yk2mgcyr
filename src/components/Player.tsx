import React from 'react';
import { Magnet } from 'lucide-react';
import { GameObject } from '../types';

interface PlayerProps {
  player: GameObject;
  onDragStart: (e: React.MouseEvent) => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onPolarityToggle: () => void;
}

export function Player({ player, onDragStart, onDrag, onDragEnd, onPolarityToggle }: PlayerProps) {
  return (
    <>
      <div 
        className={`absolute transition-colors cursor-move ${
          player.charge === 'positive' ? 'text-red-500' : 'text-blue-500'
        }`}
        style={{
          transform: `translate(${player.x}px, ${player.y}px)`,
          touchAction: 'none',
        }}
        onMouseDown={onDragStart}
        onMouseMove={onDrag}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <Magnet className="w-8 h-8" />
      </div>
      
      <button
        className={`absolute bottom-4 right-4 px-4 py-2 rounded-full font-bold ${
          player.charge === 'positive' 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        onClick={onPolarityToggle}
      >
        Switch Polarity
      </button>
    </>
  );
}