const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort("price").select("name price");
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = name;
    }

    const products = await Product.find(queryObject);
    res.status(200).json({ products, nbHits: products.length });
};

const getOneProduct = async (req, res) => {
    try {
        const { id: productId } = req.body.params;
        const product = await Product.findById({ _id: productId });

        if (!product) {
            res.status(404).json({ error: "not found..." });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ product });
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const product = await Product.findOneAndDelete({ _id: productId });
        if (!product) {
            return res.status(404).json({ error: `no product with id: ${productId}` });
        }
        res.status(200).json({ productId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ error: `no product with id: ${productId}` });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct,
};
