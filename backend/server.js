// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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` // KEEP THIS SAFE
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
