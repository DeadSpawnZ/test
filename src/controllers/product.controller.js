require('dotenv').config();
const nodemailer = require('nodemailer');
const productService = require('../services/product.service');
const userService = require('../services/user.service');

const productCtrlr = {};

productCtrlr.readProduct = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    let id_product = (req.params.id) ? req.params.id : '';
    if(id_product != ''){
        const product = await productService.validateProduct(id_product);
        if(product){
            const updated = await productService.incrementView(id_product);
            if(updated){
                status = 200;
                resp = {
                    message: 'Ok',
                    product: product
                };
            }else{
                resp = { message: 'Error al incrementar las visitas' };
            }
        }else{
            resp = { message: 'El producto no existe' };
        }
    }else{
        const { page, limit } = req.query;
        const products = await productService.getProducts(page, limit);
        status = 200;
        resp = {
            message: 'Ok',
            products: products
        };
    }
    res.status(status).json(resp);
}

productCtrlr.createProduct = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    const { prod_item } = req.body;
    const created = await productService.createProduct(prod_item);
    if(created){
        status = 200;
        resp = { message: 'Producto creado correctamente' };
    }else{
        resp = { message: 'Error al crear producto' };
    }
    res.status(status).json(resp);
}

productCtrlr.updateProduct = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    const { updates } = req.body; 
    let id_product = (req.params.id) ? req.params.id : '';
    if(id_product){
        const product = await productService.validateProduct(id_product);
        if(product){
            const updated = await productService.changeProduct(id_product, updates);
            if(updated){
                const admins = await userService.getAdmins();
                admins.forEach(async admin => {
                    await module.exports.sendMessage(admin.email, product.name);
                });
                status = 200;
                resp = { message: 'Producto actualizado correctamente' };
            }else{
                resp = { message: 'Error al actualizar el producto' };
            }
        }else{
            resp = { message: 'El producto no existe' };
        }
    }else{
        resp = { message: 'El id es un parametro necesario' };
    }
    res.status(status).json(resp);
}

productCtrlr.deleteProduct = async (req, res) => {
    let resp = { message: null };
    let status = 400;
    let id_product = (req.params.id) ? req.params.id : '';
    if(id_product){
        const product = await productService.validateProduct(id_product);
        if(product){
            const changed = await productService.changeStatusProduct(id_product, false);
            if(changed){
                status = 200;
                resp = { message: 'Producto eliminado correctamente' };
            }else{
                resp = { message: 'Error al eliminar producto' };
            }
        }else{
            resp = { message: 'El producto no existe' };
        }
    }else{
        resp = { message: 'El id es un parametro necesario' };
    }  
    res.status(status).json(resp);
}

productCtrlr.sendMessage = async (email, producto) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: "Remitente",
        to: email,
        subject: 'Producto modificado',
        text: `El producto '${producto}' fue modificado`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        return (error) ? true : false;
    });
}

module.exports = productCtrlr;