import express from "express";
import axios from "axios";

const router = express.Router();


function splitIntoChunks(text, size = 400) {
  const chunks = [];
  let i = 0;

  while (i < text.length) {
    chunks.push(text.substring(i, i + size));
    i += size;
  }
  return chunks;
}

router.post("/translate", async (req, res) => {
  try {
    const { instructions, targetLang } = req.body;

    console.log("REQUEST BODY:", req.body);

    if (!instructions || !targetLang) {
      return res.status(400).json({ error: "Missing data" });
    }

    
    const chunks = splitIntoChunks(instructions);
    console.log("TOTAL CHUNKS:", chunks.length);

    let translatedText = "";

    
    for (const chunk of chunks) {
      const apiRes = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: chunk,
            langpair: `en|${targetLang}`,
          },
        }
      );

      console.log("CHUNK RESPONSE:", apiRes.data);

      const text = apiRes.data?.responseData?.translatedText || "";
      translatedText += text + " ";
    }


    return res.json({ translation: translatedText.trim() });

  } catch (error) {
    console.error("Translation error:", error.message);
    return res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
