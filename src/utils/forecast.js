const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/ef6954fcc5ac7a45998e6c1884e2b3e1/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=de'

    request({url, json: true}, (error, { body }) => {

    if (error) {
        console.log('Ráfutott az 1. ágra!')
        callback ('Hiba1!', undefined)
    } else if (body.error){
        console.log('Ráfutott a 2. ágra!')
        callback('Hiba2!', undefined)
    } else {
        console.log('Ráfutott a jó ágra!')
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.')
    }
})
}

module.exports = forecast