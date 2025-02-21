import React, { useState } from 'react';
import axios from 'axios';

function DoubtSolver() {
  const [equation, setEquation] = useState('');
  const [solutions, setSolutions] = useState([]);
  const [error, setError] = useState('');

  const solveEquation = async () => {
    try {
      const response = await axios.post('/solve', { equation });
      setSolutions(response.data.solutions);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid input');
      setSolutions([]);
    }
  };

  return (
    <div>
      <h1>Doubt Solver</h1>
      <input
        type="text"
        value={equation}
        onChange={e => setEquation(e.target.value)}
        placeholder="e.g., x^2 - 4 = 0"
      />
      <button onClick={solveEquation}>Solve</button>
      {solutions.length > 0 && (
        <p>Solutions: {solutions.join(', ')}</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default DoubtSolver;