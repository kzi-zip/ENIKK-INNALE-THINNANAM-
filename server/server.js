const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { interpretRequest } = require('./aiService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Health and identity status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    app: 'ENIKK INNALE THINNANAM',
    caption: 'Where Goo Goo Gaa Comes to Life.',
    philosophy: 'A Child Asks. Reality Listens.',
    aiMode: process.env.GEMINI_API_KEY ? 'gemini-active' : 'local-child-logic-engine'
  });
});

// Reality Alteration endpoint
app.post('/api/alter-reality', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Please provide an impossible child request.' });
    }

    console.log(`[REALITY BUREAU] Received request: "${prompt}"`);
    const realityDirective = await interpretRequest(prompt);
    console.log(`[REALITY BUREAU] Processed: ${realityDirective.object} -> Decision: Okay.`);

    return res.json(realityDirective);
  } catch (error) {
    console.error('[REALITY BUREAU ERROR]', error);
    return res.status(500).json({ 
      error: 'Reality experienced a minor flutter.',
      details: error.message 
    });
  }
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✨ ENIKK INNALE THINNANAM ✨`);
  console.log(`Where Goo Goo Gaa Comes to Life.`);
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`====================================================`);
});
