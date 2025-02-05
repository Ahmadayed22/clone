// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String, 
        required: true,
        default:"https://antonovich-design.ae/uploads/page/2024/8/antonovich-design-20248EyR0mqntbiv.jpg",
    },
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

},{timestamps:true});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;