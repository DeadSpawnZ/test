require('dotenv').config();
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
                /*admins.forEach(async admin => {
                    // Send messages
                });*/
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

productCtrlr.sendMessage = async (email, producto, message) => {

}

module.exports = productCtrlr;