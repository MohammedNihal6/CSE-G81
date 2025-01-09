const express = require('express')
const Prompt = require('../models/promptmodel')
const {createPrompt, getPrompts, getPrompt, deletePrompt} = require('../controllers/promptController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
//require authentication for all prompt routes. 
router.use(requireAuth)


//get all prompts from database
router.get('/', getPrompts)

//post a prompt to the database
router.post('/prompt', createPrompt)

//get a prompt from the database
router.get('/:id', getPrompt)

//delete a prompt from the database
router.delete('/:id', deletePrompt)



module.exports = router