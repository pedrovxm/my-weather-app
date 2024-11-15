const weatherService = require('../Services/WeatherService.js')

async function getWeather(req, res) {

    console.log(req.params)
    try {

        const weather = await weatherService.getWeather(req.params.city)
        res.status(200).json(weather)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = { getWeather }