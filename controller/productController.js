const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");


const createProduct = asyncHandler(async (req,res) => {
    try {
        console.log(req.body);
        console.log("Hello");
        const newProduct = await Product.create(req.body)
        res.json({
            msg: "Hey it's Product Route",
            newProduct
        })
    } catch (error) {
       throw new Error(error) 
    }
})


module.exports = {createProduct};