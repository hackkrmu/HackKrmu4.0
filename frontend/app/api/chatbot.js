// pages/api/chatbot.js

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { prompt } = req.body;
  
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
  
      try {
        
        const response = await fetch("https://api.lemmebuild.com/v1/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEMMEBUILD_API_KEY}`, 
          },
          body: JSON.stringify({
            query: prompt, 
            model: "claude-v1", 
            max_tokens: 100, 
          }),
        });
  
        const data = await response.json();
  
        if (data.error) {
          return res.status(500).json({ error: data.error.message });
        }
  
        return res.status(200).json({ response: data.reply });
      } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  