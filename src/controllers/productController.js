const Product = require('~/models/Product');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate({
                path: 'category',
                select: 'name description image subcategories',
                populate: {
                    path: 'subcategories',
                    select: 'name description image status'
                }
            })
            .populate('reviews'); // Keep this as it is
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get a single product by ID
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: 'category',
                select: 'name description image subcategories',
                populate: {
                    path: 'subcategories',
                    select: 'name description image status'
                }
            })
            .populate({
                path: 'reviews',
                populate: { path: 'user', select: 'name email' }
            });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};
