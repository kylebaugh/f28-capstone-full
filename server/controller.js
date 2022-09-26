
const drinks = require('./db.json')

// Get, Post, Delete, Put

module.exports = {
    getDrinks: (req, res) => {
        res.status(200).send(drinks)
    }
} 