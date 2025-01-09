const translator = require("open-google-translator");

translator.supportedLanguages();

translator
  .TranslateLanguageData({
    listOfWordsToTranslate: ["hello here i am", "HI hello"],
    fromLanguage: "en",
    toLanguage: "hi",
  })
  .then((data) => {
    console.log(data);
  })