
const baseURL = 'http://localhost:4567'

const showDrinks = document.querySelector('#drinkDisplay')
const addButton = document.querySelector('#addDrink')

// Axios request to get drinks array
// Loop over that array
// Create drink cards for each item in the array

const getAllDrinks = () => {
    axios.get(`${baseURL}/getDrinks`)
        .then((res) => {
            displayDrinks(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const displayDrinks = (arr) => {
    for(let i = 0; i < arr.length; i++){
        createDrinkCard(arr[i])
    }
}

const createDrinkCard = (drink) => {
    const drinkCard = document.createElement('section')
    drinkCard.classList.add('drink-card')

    drinkCard.innerHTML = `
        <img src=${drink.picture} alt='drink image'/>
        <p>${drink.name}</p>
        <p>${drink.flavor}</p>
        <section>
            <button onclick="updateDrink(${drink.id}, 'dislike')">Dislike</button>
            Popularity: ${drink.likes}
            <button onclick="updateDrink(${drink.id}, 'like')">Like</button>
        </section>
        <button onclick="deleteDrink(${drink.id})">Destroy</button>
        <br><br/>
        <br><br/>
    `
    showDrinks.appendChild(drinkCard)
}

const deleteDrink = (id) => {
    axios.delete(`${baseURL}/deleteDrink/${id}`)
        .then((res) => {
            showDrinks.innerHTML = ''
            displayDrinks(res.data)
        })
}

const updateDrink = (id, type) => {
    axios.put(`${baseURL}/updateLikes/${id}`, {type})
        .then((res) => {
            showDrinks.innerHTML = ''
            displayDrinks(res.data)
        })
}


const addDrink = () => {

    let nameInput = document.querySelector('#nameInput')
    let flavorInput = document.querySelector('#flavorInput')
    let imageInput = document.querySelector('#imageInput')

    let newDrink = {
        name: nameInput.value,
        flavor: flavorInput.value,
        picture: imageInput.value
    }

    axios.post(`${baseURL}/addDrink`, newDrink)
    .then((res) => {
        showDrinks.innerHTML = ''

        nameInput.value = ''
        flavorInput.value = ''
        imageInput.value = ''

        displayDrinks(res.data)
    })
}


addButton.addEventListener('click', addDrink)
getAllDrinks()