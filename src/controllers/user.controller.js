const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const userCtrlr = {};

userCtrlr.signIn = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    const { email, pass } = req.body;
    const user = await userService.getUserByEmail(email);
    if(user){
        const is_valid = await userService.validatePassword(pass, user.password);
        if(is_valid){
            const data = {
                id: user._id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(data, process.env.JWT_KEY, {expiresIn: 86400});
            status = 200;
            resp = { 
                message: 'Ok',
                token: token
            };
        }else{
            resp = { message: 'Contraseña incorrecta' };
        }
    }else{
        resp = { message: 'Usuario no registrado' };
    }
    res.status(status).json(resp);
}

userCtrlr.createAdmin = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    const { admin_item } = req.body;
    const user = await userService.getUserByEmail(admin_item.email);
    if(!user){
        const created = await userService.createUser(admin_item);
        if(created){
            status = 200;
            resp = { message: 'Admin creado correctamente' };
        }else{
            resp = { message: 'Error al crear admin' };
        }
    }else{
        resp = { message: 'El email ya está registrado' };
    }
    res.status(status).json(resp);
}

userCtrlr.updateAdmin = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    const { updates: data } = req.body; 
    let id_admin = (req.params.id) ? req.params.id : '';
    if(id_admin){
        const admin = await userService.validateUser(id_admin);
        if(admin){
            const updated = await userService.updateUser(id_admin, data);
            if(updated){
                status = 200;
                resp = { message: 'Admin actualizado correctamente' };
            }else{
                resp = { message: 'Error al actualizar' };
            }
        }else{
            resp = { message: 'El usuario no existe' };
        }
    }else{
        resp = { message: 'El id es un parametro necesario' };
    }
    res.status(status).json(resp);
}

userCtrlr.deleteAdmin = async (req, res) => {
    
}

module.exports = userCtrlr;