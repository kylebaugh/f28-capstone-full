
const drinks = require('./db.json')
let drinkId = 4

// Get, Post, Delete, Put

module.exports = {
    getDrinks: (req, res) => {
        res.status(200).send(drinks)
    },

    addDrink: (req, res) => {

        const {name, picture, flavor} = req.body
        console.log(req.body)
        let newDrinkObject = {
            id: drinkId,
            name: name,
            picture: picture,
            flavor: flavor,
            likes: 0
        }

        drinks.push(newDrinkObject)

        drinkId++
        
        res.status(200).send(drinks)
    },

    deleteDrink: (req, res) => {
        const index = drinks.findIndex(el => el.id === +req.params.id)

        drinks.splice(index, 1)

        res.status(200).send(drinks)
    }, 

    updateLikes: (req, res) => {
        const index = drinks.findIndex(el => el.id === +req.params.id)
        const {type} = req.body

        if(type === 'like'){
            drinks[index].likes++
        }else if(type === 'dislike'){
            drinks[index].likes--
        }

        res.status(200).send(drinks)
    }
} 