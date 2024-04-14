const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require('slugify'); // Import the slugify library
const validateMongodbId = require("../utils/validateMongodbId");



// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        newProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  });


// Update an existing product
const updateProduct = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id); // Validate the MongoDB ID format
  
      if (!req.body.title) {
        return res.status(400).json({ error: 'Title is required for updating the product' });
      }
  
      const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({
        success: true,
        msg: "Product updated successfully",
        updatedProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  });



// Get a single product by ID
const getProduct = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id); // Validate the MongoDB ID format
  
      const findProduct = await Product.findById(id);
      if (!findProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({
        success: true,
        findProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  
  // Get all products
  const getProducts = asyncHandler(async (req, res) => {
    try {
      const findProducts = await Product.find();
      res.json({
        success: true,
        findProducts
      });
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = {createProduct, getProduct, getProducts,updateProduct};