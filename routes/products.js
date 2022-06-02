const express = require("express");
const router = express.Router();

const { getOneProduct, getAllProductsStatic, getAllProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);
router.get("/:id", getOneProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
