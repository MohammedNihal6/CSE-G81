require('dotenv').config()
// import cors from "cors";

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT;
const promptRouter = require('./routes/promptRouter')

app.use(express.json());
// app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/prompts', promptRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to the database, Listening at port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })

