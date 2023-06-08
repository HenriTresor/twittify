import User from '../models/User.model.js'

let checkUser = async (id) => {
    let user = await User.findById(id)
    return user ? true : false
}

export {
    checkUser
}