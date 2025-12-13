import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/translate", async (req, res) => {
  try {
    const { instructions, targetLang } = req.body;

    console.log("REQUEST BODY:", req.body);

    if (!instructions || !targetLang) {
      return res.status(400).json({ error: "Missing data" });
    }

    const apiUrl = "https://api.mymemory.translated.net/get";

    const response = await axios.get(apiUrl, {
      params: {
        q: instructions,
        langpair: `en|${targetLang}`,
      },
    });

    console.log("API RAW RESPONSE:", response.data);

    let translation = response.data?.responseData?.translatedText || "";

    // fallback: choose best match
    const matches = response.data?.matches || [];
    const best = matches.find((m) => m.match >= 0.90);

    if (best) {
      translation = best.translation;
    }

    if (!translation) {
      console.log("NO TRANSLATION FOUND!");
      return res.json({ translation: "Translation unavailable." });
    }

    return res.json({ translation });

  } catch (error) {
    console.error("Translation error:", error);
    return res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
