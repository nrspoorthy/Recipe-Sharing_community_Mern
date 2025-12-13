import express from "express";
import axios from "axios";

const router = express.Router();

function splitIntoChunks(text, size = 800) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.substring(i, i + size));
  }
  return chunks;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

router.post("/translate", async (req, res) => {
  try {
    const { instructions, targetLang } = req.body;

    if (!instructions || !targetLang) {
      return res.status(400).json({ error: "Missing data" });
    }

    const chunks = splitIntoChunks(instructions);
    let translatedText = "";

    for (const chunk of chunks) {
      const apiRes = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: chunk,
            langpair: `en|${targetLang}`,
            de: "your-email@gmail.com"
          },
        }
      );

      translatedText += apiRes.data?.responseData?.translatedText + " ";
      await delay(1200);
    }

    res.json({ translation: translatedText.trim() });

  } catch (error) {
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded. Try again after some time."
      });
    }

    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
