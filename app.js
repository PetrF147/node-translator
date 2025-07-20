
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
        source: source || "auto",   // Ustaw domyślnie auto
        target: target || "de",     // Domyślnie na niemiecki
        format: format || "text",
        alternatives: 3,            // Nowy parametr
        api_key: ""                 // Puste, bo publiczne API
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!data.translatedText) {
      console.error("LibreTranslate error:", data);
      return res.status(500).json({ error: 'Translation error', details: data });
    }
    res.json(data);
  } catch (e) {
    console.error("Server error:", e);
    res.status(500).json({ error: 'Translation error', details: e.message });
  }
});

app.get('/', (req, res) => res.send('Serwer tłumacza działa!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));


