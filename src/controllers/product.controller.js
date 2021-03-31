const productService = require('../services/product.service');

const productCtrlr = {};

productCtrlr.readProduct = async (req, res) => {
    
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
    
}

productCtrlr.deleteProduct = async (req, res) => {
    
}

productCtrlr.sendMessage = async (email, producto) => {
    
}

module.exports = productCtrlr;