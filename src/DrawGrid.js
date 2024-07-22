import React, { useState, useEffect } from 'react';
import './DrawGrid.css';

// Helper function to initialize a 28x28 grid
const initializeGrid = () => {
  const grid = [];
  for (let i = 0; i < 28; i++) {
    grid.push(Array(28).fill(0));
  }
  return grid;
};

const DrawGrid = ({ onPredict }) => {
  const [grid, setGrid] = useState(initializeGrid());
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('pen'); // Modes: 'pen', 'eraser'
  const [canPredict, setCanPredict] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const hasPixels = grid.some(row => row.some(cell => cell === 1));
    setCanPredict(hasPixels);
  }, [grid]);

  // Handle drawing on the grid
  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    modifyCell(row, col);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseEnter = (row, col) => {
    if (isDrawing) {
      modifyCell(row, col);
    }
  };

  const modifyCell = (row, col) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (mode === 'pen') {
            return 1; // Fill the cell
          } else if (mode === 'eraser') {
            return 0; // Clear the cell
          }
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  // Convert the grid to an array for prediction
  const getGridArray = () => {
    return grid.flat();
  };

  const handlePredict = async () => {
    if (canPredict) {
        const gridArray = getGridArray();
        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grid: gridArray }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error('Error predicting digit:', error);
        }
    }
};

  const handleClear = () => {
    setGrid(initializeGrid());
    setPrediction(null);
  };

  return (
    <div>
      <div className="toolbar">
        <button
          className={mode === 'pen' ? 'active' : ''}
          onClick={() => setMode('pen')}
        >
          Pen
        </button>
        <button
          className={mode === 'eraser' ? 'active' : ''}
          onClick={() => setMode('eraser')}
        >
          Eraser
        </button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handlePredict} disabled={!canPredict}>
          Predict
        </button>
      </div>
      <div
        className="grid"
        onMouseLeave={handleMouseUp}
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(28, clamp(10px,2.5vw,15px))`,
          gridTemplateColumns: `repeat(28, clamp(10px,2.5vw,15px))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell === 1 ? 'filled' : ''}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
            />
          ))
        )}
      </div>
      {prediction !== null && (
        <div className="prediction">
          <h2>Prediction: {prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default DrawGrid;
