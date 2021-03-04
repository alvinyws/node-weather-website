const request = require('request')

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWx2aW55d3MiLCJhIjoiY2tqZnZuZG96NDV3NjJxcGRlcTRteWkwOSJ9.HHIGkwakyr5DO3shzxTmPA&limit=1'

    request({ url: geoUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Geocode services!', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode