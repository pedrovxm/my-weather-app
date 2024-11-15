
const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    _id : { type: String, required: true},
    Username : { type: String, required: true, unique: true },
    Password : { type: String, required: true },
    Created_at : { type: Date, required: true },
})

const User = mongoose.model('User',userSchema)


module.exports = {User}

