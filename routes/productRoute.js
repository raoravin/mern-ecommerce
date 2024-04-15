const express = require("express");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
