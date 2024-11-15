const { User } = require('../Models/UserModel.js')
const { v4: uuidv4 } = require('uuid');



async function createUser(userData) {

    const Username = userData.Username
    const Password = userData.Password
    const Created_at = userData.Created_at

    try {
        const user = new User({
            _id: uuidv4(),
            Username: userData.Username,
            Password: userData.Password,
            Created_at: userData.Created_at
        })
        await user.save()
        console.log('User created', user)
        return user

    }
    catch (err) {
        console.log('Error creating user:', err)
    }
}

async function findUser(_id) {

    try {
        const user = await  User.findById(_id)
        if (!user) {
            throw new Error('User not found');
        }
        console.log('User found',user)
        return user
    }
    catch (err) {
        console.log('Error finding user:', err)
    }

}

async function deleteUser(_id){
    try{
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            throw new Error('User not found');
        }
        console.log('User deleted',user)
        return user
    }catch (err) {
        console.log('Error deleting user:', err)
    }
}




module.exports = { createUser,findUser,deleteUser }