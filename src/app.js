const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

 //set up handlebars for dynamic template, setting up views,setting up partials
app.set('view engine','hbs')          
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    //res.send()                sending information back to the requestor
    res.render('index', {
        title: 'Weather',
        name: 'Alvin'
    })             //allowing us to render our views
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About Us</h1>')
// })

app.get('/about', (req, res) => {
    //res.send()                sending information back to the requestor
    res.render('about', {
        title: 'About Us',
        name: 'Alvin'
    })             //allowing us to render our views
})

app.get('/help', (req, res) => {
    //res.send()                sending information back to the requestor
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Alvin'
    })             //allowing us to render our views
})

app.get('/weather', (req, res) => {
    if(!req.query.address){      //request condition set
        return res.send({
            error: "Please enter an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error: error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })    
        })
    })  
    
    // console.log(res.query.address)
    // res.send({
    //     weather: Sunny,
    //     location: Singapore,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }

    res.query()
    res.send({               // cannot res.send() twice, because json request is single way, cannot respond twice
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alvin',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alvin',
        errorMessage: 'Page 404 not found!'
    })
})

// app.get('*', (req, res) => {
//     res.send('My 404 page.')               //error page setup
// })

//app.com
//app.com/help
//app.com/about



app.listen(3000, () => {                         //start up the server
    console.log('Server is up on port 3000')
})       