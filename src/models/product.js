const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    sku: {
        type:       String,
        required:   true
    },
    name: {
        type:       String,
        required:   true
    },
    price: {
        type:       Number,
        required:   true
    },
    brand: {
        type:       String
    },
    status: {
        type:       Boolean,
        required:   true,
        default:    true
    },
    views: {
        type:       Number,
        default:    0
    }
}, {
    timestamps:     true
});

module.exports = model('Product', productSchema);