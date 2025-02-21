import React, { useState } from 'react';
import axios from 'axios';
import p5 from 'p5';

function VideoPlayer() {
  const [prompt, setPrompt] = useState('');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  let sketchInstance;

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
      p.background(220);
    };
    p.draw = () => {
      p.fill(255, 0, 0);
      p.ellipse(p.width / 2, p.height / 2, 50 + p.sin(p.frameCount * 0.05) * 20);
    };
  };

  useEffect(() => {
    sketchInstance = new p5(sketch, document.getElementById('simulation'));
    return () => sketchInstance.remove();
  }, []);

  const generateExplanation = async () => {
    try {
      const response = await axios.post('/generate-explanation', { prompt });
      setExplanation(response.data.explanation);
      setError('');
    } catch (err) {
      if (err.response?.status === 503) {
        setError('Video generation unavailable (API key missing). Enjoy this simulation instead!');
      } else {
        setError('Error generating explanation.');
      }
      setExplanation('');
    }
  };

  return (
    <div>
      <h1>Concept Videos</h1>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="e.g., Explain projectile motion"
      />
      <button onClick={generateExplanation}>Generate Video</button>
      {explanation && (
        <div>
          <h2>Explanation</h2>
          <p>{explanation}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Interactive Simulation</h2>
      <div id="simulation"></div>
    </div>
  );
}

export default VideoPlayer;