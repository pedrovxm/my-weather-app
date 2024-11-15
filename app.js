const express = require('express')
const userController = require('./Controllers/userController.js')
const weatherController = require('./Controllers/WeatherController.js')
const {initializeDatabase} = require('./config/db.js')


async function startApp (){
    initializeDatabase()
    const port = 3030
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

app.post('/user',(req,res) => {
    userController.createUser(req,res)
})

app.get('/user/:id',(req,res) => {
    userController.findUser(req,res)
})

app.delete('/user/:id',(req,res) => {
    userController.deleteUser(req,res)
})

app.get('/weather/:city',(req,res)=>{
    weatherController.getWeather(req,res)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


}


startApp()