const mongoose = require('mongoose')

const Schema = mongoose.Schema

const promptSchema = new Schema({
    originalTranscript : {
        type: String,
        required: true
    },
    translatedTranscript : {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps:true})

const Prompt = mongoose.model('Prompt',promptSchema)
module.exports = Prompt