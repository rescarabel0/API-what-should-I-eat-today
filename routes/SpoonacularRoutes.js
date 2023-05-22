const express = require("express");
const https = require('node:https');
const router = express.Router();

router.get(['/recipe', '/recipe/'], (req, res) => {
    https.get('https://api.spoonacular.com/recipes/random?number=1&apiKey=be1c6811746943559cb24c21122b2899', _res => {
        let data = '';
        _res.on('data', (d) => {
            data += d
        })
        _res.on('end', () => {
            const recipe = JSON.parse(data).recipes[0]
            res.send(recipe)
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
            res.send({ingredients: response})
        })
    })
})

module.exports = router