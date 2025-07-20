const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { q, source, target, format } = req.body;
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      body: JSON.stringify({
        q,
        source: source || "auto",     // wykrywanie automatyczne
        target,
        format: format || "text",
        alternatives: 3,              // dodatkowe tłumaczenia (opcjonalnie)
        api_key: ""                   // (pozostaw puste)
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Translation error' });
  }
});

app.get('/', (req, res) => res.send('Serwer tłumacza działa!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));


