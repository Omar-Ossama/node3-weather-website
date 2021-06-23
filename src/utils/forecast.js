const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=f0a91c3742174f3ad7fd204a4b91e0d3&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        if(error){
        callback('Unable to connect to weather service', undefined)

    } else if (body.error) {

        callback('Unable to find loacation', undefined)

    } else {

        callback(undefined, body.current.weather_descriptions[0]+'. The tempreture is '+ body.current.temperature +' degrees out and feels like '+ body.current.feelslike + ' degrees in with ' + body.current.humidity+'% humidity and wind speed of ' + body.current.wind_speed + ' km/h' )
        
    }



})

    
}

module.exports = forecast
