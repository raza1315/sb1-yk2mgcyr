import React, { useEffect, useState } from 'react';
import { Timer } from './Timer';
import { Player } from './Player';
import { Particles } from './Particles';
import { GameOver } from './GameOver';
import { Instructions } from './Instructions';
import { useGameLogic } from '../hooks/useGameLogic';

export function Game() {
  const {
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
  } = useGameLogic();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between w-full max-w-[400px] mb-4">
        <div className="text-2xl font-bold">Score: {score}</div>
        <Timer timeLeft={timeLeft} />
      </div>

      <div className="relative w-[400px] h-[400px] bg-gray-800 rounded-lg border-2 border-gray-700">
        <Player
          player={player}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onPolarityToggle={togglePolarity}
        />
        
        <Particles objects={objects} />

        {gameOver && <GameOver score={score} onRestart={resetGame} />}
      </div>
      
      <Instructions />
    </div>
  );
}