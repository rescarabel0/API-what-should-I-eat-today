const express = require("express");
const https = require('node:https');
const router = express.Router();
const UserDAO = require('../dao/UserDAO')

router.get(['/recipe', '/recipe/'], async (req, res) => {
    const user = await UserDAO.findById(req.user)
    const dislikes = user.dislikes;
    const intolerances = user.intolerances;
    const diets = user.diets;

    let url = 'https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1&apiKey=be1c6811746943559cb24c21122b2899&type=main course'
    if (dislikes) {
        url += `&excludeIngredients=${dislikes}`
    }
    if (intolerances) {
        url += `&intolerances=${intolerances}`
    }
    if (diets) {
        url += `&diet=${diets}`
    }

    console.log(url)
    https.get(url, _res => {
        let data = '';
        _res.on('data', (d) => {
            data += d
        })
        _res.on('end', () => {
            const recipe = JSON.parse(data).results[0]
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