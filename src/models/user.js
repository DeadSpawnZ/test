const crypto = require('crypto');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type:       String,
        match:      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
        unique:     true,
        required:   true
    },
    password: {
        type:       String,
        required:   true
    },
    role:{
        type:       String
    },
    status: {
        type:       Boolean,
        required:   true,
        default:    true
    }
}, {
    timestamps:     true
});

userSchema.statics.encryptPassword = async password => {
    return await crypto.createHmac("sha256", process.env.KEY).update(password).digest("hex");
};

userSchema.statics.matchPassword = async (pass_typed, pass_db) => {
    const pass = await crypto.createHmac("sha256", process.env.KEY).update(pass_typed).digest("hex");
    return (pass === pass_db);
}

module.exports = model('User', userSchema);