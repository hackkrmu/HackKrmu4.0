export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
      const response = await fetch("http://localhost:8080/v1/chat/completions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer YOUR_API_KEY`
          },
          body: JSON.stringify({
              messages: [
                  { role: "system", content: "You are a helpful assistant." },
                  { role: "user", content: req.body.prompt }
              ],
              model: "Llama-3-8B-Instruct-262k-Q5_K_M"
          }),
      });

      const data = await response.json();
      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
