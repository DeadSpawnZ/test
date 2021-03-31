const mongoose = require('mongoose');
const Product = require('../models/product');

const productService = {};

productService.validateProduct = async (id_product) => {
    const id = mongoose.Types.ObjectId(id_product);
    return await Product.findOne({ _id: id, status: true });
}

productService.incrementView = async (id_product) => {
    try{
        const id = mongoose.Types.ObjectId(id_product);
        await Product.findOneAndUpdate({ _id: id }, {$inc: { views: 1 }});
        return true;
    }catch(err){
        return false;
    }
}

productService.getProducts = async (page, limit) => {
    return await Product.find({ status: true })
        .limit(limit)
        .skip((page - 1) * limit);
}

productService.createProduct = async (prod_item) => {
    try{
        const new_product = new Product({
            sku: prod_item.sku,
            name: prod_item.name,
            price: prod_item.price,
            brand: prod_item.brand,
            status: prod_item.status
        });
        await new_product.save();
        return true;
    }catch(err){
        return false;
    }
}

productService.changeProduct = async (id_product, updates) => {
    try{
        const id = mongoose.Types.ObjectId(id_product);
        const result = await Product.updateOne({ _id: id }, updates);
        return (result.ok) ? true : false;
    }catch(err){
        return false;
    }
}

productService.changeStatusProduct = async (id_product, new_status) => {
    try{
        const product = await module.exports.validateProduct(id_product);
        product.status = new_status;
        await product.save();
        return true;
    }catch(err){
        return false;
    }
}

module.exports = productService;