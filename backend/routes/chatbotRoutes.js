import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * Split long text into safe chunks
 */
function splitIntoChunks(text, size = 400) {
  const chunks = [];
  let i = 0;

  while (i < text.length) {
    chunks.push(text.substring(i, i + size));
    i += size;
  }

  return chunks;
}

/**
 * Sleep helper to avoid rate limits (429)
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

router.post("/translate", async (req, res) => {
  try {
    const { instructions, targetLang } = req.body;

    console.log("REQUEST BODY:", req.body);

    if (!instructions || !targetLang) {
      return res.status(400).json({ error: "Missing data" });
    }

    // 🔹 split long instructions
    const chunks = splitIntoChunks(instructions);
    console.log("TOTAL CHUNKS:", chunks.length);

    let translatedText = "";

    // 🔹 translate each chunk safely
    for (const chunk of chunks) {
      const apiRes = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: chunk,
            langpair: `en|${targetLang}`,
          },
          timeout: 10000,
        }
      );

      console.log("CHUNK RESPONSE:", apiRes.data);

      const text =
        apiRes.data?.responseData?.translatedText || "";

      translatedText += text.trim() + " ";

      // ⏳ wait to avoid 429 (VERY IMPORTANT)
      await sleep(1000);
    }

    return res.json({ translation: translatedText.trim() });

  } catch (error) {
    console.error(
      "Translation error:",
      error?.response?.data || error.message
    );
    return res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
