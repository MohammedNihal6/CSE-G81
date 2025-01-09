require('dotenv').config()
// import cors from "cors";

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT;
const promptRouter = require('./routes/promptRouter')
const userRoutes = require('./routes/userRouter')
const translateRoutes = require('./routes/translationRouter')
const gTTS = require("gtts");
const path=require('path');


app.use(cors());
app.use(express.json());
// app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/prompts', promptRouter);
app.use('/api/user', userRoutes);
app.use('/api/translations', translateRoutes);

// Text-to-Speech Route
app.post("/api/tts", async (req, res) => {
    const { text, language } = req.body;
  
    if (!text || !language) {
      return res.status(400).json({ error: "Text and language are required" });
    }
  
    try {
      const tts = new gTTS(text, language);
      const filename = `output_${Date.now()}.mp3`;
      const filepath = path.join(__dirname, "audio", filename);
  
      // Save the audio file
      tts.save(filepath, (err) => {
        if (err) {
          console.error("Error saving audio file:", err);
          return res.status(500).json({ error: "Failed to generate audio" });
        }
        res.status(200).json({ audioUrl: `http://localhost:${PORT}/audio/${filename}`});
      });
    } catch (error) {
      console.error("Error generating TTS:", error);
      res.status(500).json({ error: "Error processing TTS request" });
    }
  });
  
  // Serve Audio Files
app.use("/audio", express.static(path.join(__dirname, "audio")));
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to the database, Listening at port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })

