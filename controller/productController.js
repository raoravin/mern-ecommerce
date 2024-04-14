const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");


const createProduct = asyncHandler(async (req,res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.json({
            msg: "Hey it's Product Route",
            newProduct
        })
    } catch (error) {
       throw new Error(error) 
    }
})







const getProduct = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params;
        const findProduct = await Product.findById(id);
        res.json({
            success: true,
            findProduct
        })
    } catch (error) { 
        throw new Error(error)
    }
})



const getProducts = asyncHandler(async (req,res) => {
    try {
        const findProducts = await Product.find();
        res.json({
            success:true,
            findProducts
        });
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {createProduct, getProduct, getProducts};