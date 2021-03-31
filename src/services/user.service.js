const mongoose = require('mongoose');
const User = require('../models/user');

const userService = {};

userService.getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

userService.validatePassword = async (password, user_password) => {
    return await User.matchPassword(password, user_password);
}

userService.createUser = async (admin_item) => {
    try{
        const new_admin = new User({
            email: admin_item.email,
            password: await User.encryptPassword(admin_item.pass),
            role: admin_item.role
        });
        await new_admin.save();
        return true;
    }catch(err){
        return false;
    }
}

module.exports = userService;