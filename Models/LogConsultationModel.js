const mongoose = require('mongoose')
const User = require('./UserModel.js')



const logConsultationSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true


    },

    city : {type: String ,required: true},

    timestamp : {type:Date ,default: Date.now}
})

const LogConsultation = mongoose.model('LogConsultation',logConsultationSchema)



module.exports = {LogConsultation}