const mongoose = require('mongoose')
uri = 'mongodb+srv://pedrovxm:pedro@cluster0.fzhmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'



async function initializeDatabase() {
    try {
        await mongoose.connect(uri)
        console.log('Connected')
    }
    catch (err) {
        console.log('Error connecting with db:', err)
    }
}


module.exports = {initializeDatabase}