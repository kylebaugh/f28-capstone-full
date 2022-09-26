const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    getDrinks, 
    addDrink, 
    deleteDrink,
    updateLikes
} = require('./controller')

app.get('/getDrinks', getDrinks)
app.post('/addDrink', addDrink)
app.delete('/deleteDrink/:id', deleteDrink)
app.put('/updateLikes/:id', updateLikes)

app.listen(4567, () => console.log('Avenger assemble on port 4567!'))