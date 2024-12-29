import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl">Final Score: {score}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}