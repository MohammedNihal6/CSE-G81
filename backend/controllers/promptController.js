const Prompt = require("../models/promptmodel")

//get all prompts
const getPrompts = async(req, res) => {
    const Prompts = await Prompt.find({}).sort({createdAt: -1})

    res.status(200).json(Prompts)
}



//post a prompt to database
const createPrompt = async (req, res) => {
    const {query} = req.body;
    try{
        const prompt = await Prompt.create({query})
        res.status(200).json(prompt)
    }
    catch(error){
        res.status(400).json({err:error.message})
    }
}

module.exports = {
    createPrompt, getPrompts
}