import React from 'react';
import { GameObject } from '../types';

interface ParticlesProps {
  objects: GameObject[];
}

export function Particles({ objects }: ParticlesProps) {
  return (
    <>
      {objects.map((obj, index) => (
        <div
          key={index}
          className={`absolute w-4 h-4 rounded-full transition-transform duration-75 ${
            obj.charge === 'positive' ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{
            transform: `translate(${obj.x}px, ${obj.y}px)`,
          }}
        />
      ))}
    </>
  );
}