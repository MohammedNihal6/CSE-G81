const translator = require("open-google-translator");

const translate = async (req, res) => {
  const { text, userLanguage, binodLanguage } = req.body;

  if (!text || !userLanguage || !binodLanguage) {
    return res.status(400).json({ error: "Text, user language and binod language  are required." });
  }

  // Translating the transcript
  try {
    const translatedText = await translator.TranslateLanguageData({
        listOfWordsToTranslate:[text],
        fromLanguage:userLanguage,
        toLanguage: binodLanguage,
    });
    //sending it back to the server.
    const translatedScript = translatedText[0];
    res.json({translation: translatedScript});

  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
};

module.exports = { translate };
