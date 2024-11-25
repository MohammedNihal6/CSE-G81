const express = require('express')
const Prompt = require('../models/promptmodel')
const {createPrompt, getPrompts} = require('../controllers/promptController')
const router = express.Router()

router.get('/', getPrompts)

router.post('/prompt', createPrompt)

module.exports = router