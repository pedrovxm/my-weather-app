const userServices = require('../Services/userServices.js')



async function createUser(req, res) {
    try {

        const user = await userServices.createUser(req.body)
        res.status(201).json({ message: 'Usuário criado com sucesso', user });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

async function findUser(req, res) {

    try {
        const user = await userServices.findUser(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteUser(req,res){
    try{
        const user = await userServices.deleteUser(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = { createUser,findUser,deleteUser }