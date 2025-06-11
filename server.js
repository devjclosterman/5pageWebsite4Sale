const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = 'your-secret-key-here'; // <<< your real key here

app.post('/ask', async (req, res) => {
  const { message } = req.body;

  const payload = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are Forge AI, a humble and helpful assistant for Desert Forged Technologies..."
      },
      {
        role: "user",
        content: message
      }
    ]
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log('🧠 Forge AI server running on http://localhost:3000');
});
