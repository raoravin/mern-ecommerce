const express= require("express");
const { createProduct, getProduct, getProducts } = require("../controller/productController");
const router = express.Router();


router.post("/create",createProduct);
router.get("/:id", getProduct);
router.get("/", getProducts)


module.exports = router;