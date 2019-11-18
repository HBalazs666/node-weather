//Ezek a hbs dolgai, így fogunk hivatkozni.
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

//PREVENTDEFAULT --> hogy ne töltődjön újra az egész oldal mindig
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    //FETCH: küldünk egy kérést és az erre kapott választ kiíratjuk. Használatát érdemes jobban tanulmányozni...
    //A kérést követő lépések a másik app.js /weather részében láthatóak. 
    //Az ott lévő res.send (3 elemű objektum) az itt megjelenő data objektum. 

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if ( data.error) {
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

    console.log(location)
})