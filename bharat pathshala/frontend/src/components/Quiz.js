import React, { useState } from 'react';
import axios from 'axios';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const questions = [
    { id: 1, text: 'What is 2 + 2?', options: ['3', '4', '5'], correct: '4' },
    { id: 2, text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin'], correct: 'Paris' },
  ];

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const userScore = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    const total = questions.length;
    setScore(`${userScore}/${total}`);
    await axios.post('/quiz', { score: userScore / total * 100 }, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <div>
      <h1>Interactive Quiz</h1>
      {questions.map(q => (
        <div key={q.id}>
          <p>{q.text}</p>
          {q.options.map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name={`q${q.id}`}
                value={opt}
                onChange={() => setAnswers({ ...answers, [q.id]: opt })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score && <p>Your Score: {score}</p>}
    </div>
  );
}

export default Quiz;