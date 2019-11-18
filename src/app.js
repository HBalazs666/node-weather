//Ezeket a függvényeket külön fájlban írtuk meg
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//ezek azok az npm csomagok, amiket használni fogunk
const path = require('path')
const express = require('express')
const hbs = require('hbs')


//szerver létrehozásához
const app = express()

//Beállítjuk a view engine-t (hbs) és az útvonalakat a fájlokhoz.
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))

//A főoldal dolgai. Renderelendő fájl és átadandó értékek megadása.
//Többi oldalon is ugyanez a módszer.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hirth Balázs'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hirth Balázs'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        text: 'Példaszöveg',
        name: 'Hirth Balázs'
    })
})

//Index oldalon meg kell adni egy address-t, különben a függvények nem fut le a geocode függvény.
//A public mappában lévő js fájl fogja fetch-elni a /weather-t a form-ban megadott érték alapján.
//A formban megadott értékeket a req.query. ... -val tudjuk kinyerni.
//A callback érték a teljes "body" helyett a body 3 értékéből kreált objektum.
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            //Ha minden rendben, a válasz a hasznos információ 3 eleme egy objektumban. (callback objektum)

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
       products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help oldal nem található!',
        title: '404',
        name: 'Hirth Balázs'
        
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'About oldal nem található!',
        name: 'Hirth Balázs'
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hirth Balázs',
        errorMessage: 'Az oldal nem található'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})