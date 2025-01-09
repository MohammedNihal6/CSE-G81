const Prompt = require("../models/promptmodel")
const mongoose = require('mongoose')

//get all prompts
const getPrompts = async(req, res) => {

    const user_id = req.user._id
    const Prompts = await Prompt.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(Prompts)
}



//post a prompt to database
const createPrompt = async (req, res) => {
    const { originalTranscript, translatedTranscript } = req.body;
    try{
        const user_id = req.user._id
        const prompt = await Prompt.create({ originalTranscript, translatedTranscript, user_id })
        res.status(200).json(prompt)
    }
    catch(error){
        res.status(400).json({err:error.message})
    }
}

//delete a prompt
const deletePrompt = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid prompt id'})
    }

    const deletedprompt = await Prompt.findByIdAndDelete({_id: id})

    if(!deletedprompt) {
        return res.status(404).json({ error: 'No such prompt found'})
    }
    res.status(200).json(deletedprompt)
}

//fetch a prompt by id
const getPrompt = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such prompt found in the database"})
    }

    const foundPrompt = await Prompt.findById(id)

    if(!foundPrompt) {
        return res.status(404).json({error: "No such prompt found in the database"})
    }
    res.status(200).json(foundPrompt)
}

module.exports = {
    createPrompt, getPrompts, getPrompt, deletePrompt
}