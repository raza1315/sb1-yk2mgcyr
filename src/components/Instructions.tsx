import React from 'react';

export function Instructions() {
  return (
    <div className="mt-4 text-center">
      <h2 className="text-xl font-bold mb-2">How to Play:</h2>
      <p>Use arrow keys to move</p>
      <p>Click the polarity button or press SPACE to switch polarity</p>
      <p>Attract opposite charges, avoid same charges!</p>
      <p>Score as many points as possible in 60 seconds!</p>
    </div>
  );
}