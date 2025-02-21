import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;
    const response = await axios.post('/chat', { message });
    setChat([...chat, { user: message, bot: response.data.response }]);
    setMessage('');
  };

  return (
    <div>
      <h1>AI Chatbot Tutor</h1>
      <div className="chat-container">
        {chat.map((entry, idx) => (
          <div key={idx}>
            <p><strong>You:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;