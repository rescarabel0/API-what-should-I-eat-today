const express = require("express");
const https = require('node:https');
const router = express.Router();

router.get(['/recipe', '/recipe/'], (req, res) => {
    https.get('https://api.spoonacular.com/recipes/complexSearch?number=1&includeIngredients=onion,tomato,pasta&addRecipeInformation=true&apiKey=be1c6811746943559cb24c21122b2899', _res => {
        let data = '';
        _res.on('data', (d) => {
            data += d
        })
        _res.on('end', () => {
            const recipe = JSON.parse(data).results[0]
            res.send({recipe: recipe.title, id: recipe.id})
        })
    })
})

router.get(['/recipe/:id', '/recipe/:id/'], (req, res) => {
    const id = req.params.id
    if (!id || isNaN(id)) {
        res.status(400).send({error: 'Missing recipe id'})
        return
    }
    https.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=be1c6811746943559cb24c21122b2899`, _info => {
        let info = '';
        _info.on('data', (d) => {
            info += d
        })
        _info.on('end', () => {
            const response = JSON.parse(info).extendedIngredients.map(i => i.originalName).join(', ')
            res.send(response)
        })
    })
})

module.exports = router