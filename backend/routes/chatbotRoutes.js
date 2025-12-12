import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/translate", async (req, res) => {
  try {
    const { instructions, targetLang } = req.body;

    if (!instructions || !targetLang) {
      return res.status(400).json({ error: "Missing data" });
    }

    const response = await axios.post("https://libretranslate.de/translate", {
      q: instructions,
      source: "auto",
      target: targetLang.toLowerCase(),
      format: "text",
    });

    res.json({ translation: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
