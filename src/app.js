const path = require('path')
const forecast = require('./utils/forecast')

const geocode = require('./utils/geocode')

const express = require('express')
const hbs = require('hbs')

// Define paths fpr Express config
const app = express()
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Omar Ossama'
    })


} )
app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About me', 
        name: 'Omar Ossama'
    })

})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Omar Ossama'
    })

})
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    

  
   geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }
         
       
         forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res,send({
                     error
                })
            } 
    
    
            res.send({
               location,
               forecast: forecastData,
               address: req.query.address
            })
        
          })
        
        
        
    
    } )

 
    
})



app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })

    }
    
    res.send({
        products: []
    })
}
)

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'404',
        name: 'Omar Ossama',
        message: 'Help article not found', 
    })
})


app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name:'Omar Ossama',
        message: 'Page not found' 
    })

})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)


})