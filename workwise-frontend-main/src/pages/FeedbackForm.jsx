import React, { useState } from 'react';

function FeedbackPage() {
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [lock, setLock] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', message);
    setFeedbackSubmitted(true);
    setLock(true)
    setMessage('');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your feedback here..."
        />
        <button
        disabled={lock}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
      {feedbackSubmitted && (
        <p className="text-green-600 mt-4 text-center">Feedback submitted successfully!</p>
      )}
    </div>
  );
}

export default FeedbackPage;
