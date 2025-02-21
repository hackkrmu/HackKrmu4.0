require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new router
const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are Olive AI, a personalized chatbot strictly to answer skin-related queries...",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Chat route
router.post("/chat", authMiddleware ,async (req, res) => {
    try {
      const userMessage = req.body.message;
      if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
      }
  
      const chatSession = model.startChat({ generationConfig });
  
      const result = await chatSession.sendMessage([userMessage]); // Ensure it's an array
      const responseText = result.response.text();
  
      res.json({ response: responseText });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

module.exports = router;