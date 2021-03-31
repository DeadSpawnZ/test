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

userService.validateUser = async (id_user) => {
    const id = mongoose.Types.ObjectId(id_user);
    return await User.findOne({ _id: id });
}

userService.updateUser = async (id_user, data) => {
    try{
        const id = mongoose.Types.ObjectId(id_user);
        const updates = {
            email: data.email,
            password: await User.encryptPassword(data.pass),
            role: data.role
        }
        const result = await User.updateOne({ _id: id }, updates);
        return (result.ok) ? true : false;
    }catch(err){
        return false;
    }
}

userService.getAdmins = async () => {
    return await User.find({ status: true }, "email -_id");
}

module.exports = userService;