const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=f39d795b3d78d0a64454f97ef31dc07f&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url: weatherStackUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Weather services!', undefined)
        } else if (response.body.error){
            callback('Unable to find location. Try another search!', undefined)
        } else {
            var answer = response.body.current.weather_descriptions[0] + ':  It is currently ' + response.body.current.temperature + ' degrees out there, but it feels like ' + response.body.current.feelslike + ' degrees out there.'
            
            callback(undefined, answer)     
        }
    })
}


module.exports = forecast