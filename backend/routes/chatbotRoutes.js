import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import OpenAI from "openai";

console.log("CHATBOT ROUTE KEY:", process.env.OPENAI_API_KEY); 

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/translate", async (req, res) => {
  try {
    const { instructions, targetLang } = req.body;

    if (!instructions || !targetLang) {
      return res.status(400).json({ error: "Missing data" });
    }

    const prompt = `
Translate the following cooking instructions into ${targetLang}.
Only return the translation, no extra explanation.

Instructions:
${instructions}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ translation: response.choices[0].message.content });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
