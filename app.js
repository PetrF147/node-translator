const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { q, source, target, format } = req.body;
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: q,
        source: source || "auto",
        target: target || "de",
        format: format || "text",
        api_key: "",
        alternatives: 3
      }),
    });

    const data = await response.json();
    if (data.translatedText) {
      res.json({ translatedText: data.translatedText });
    } else {
      res.status(500).json({ error: data.error || 'Translation error', details: data });
    }
  } catch (e) {
    res.status(500).json({ error: 'Translation error', details: e.message });
  }
});

app.get('/', (req, res) => res.send('Serwer tłumacza działa!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));




