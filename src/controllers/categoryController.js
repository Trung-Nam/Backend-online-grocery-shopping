import Category from '~/models/Category';

// Get all categories with populated subcategories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('subcategories', 'name description image status');

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name, description, image, subcategories } = req.body;

        if (!name || !image) {
            return res.status(400).json({ message: 'Name and image are required fields' });
        }

        const category = new Category({
            name,
            description,
            image,
            subcategories,
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

// Get a single category by ID with populated subcategories
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('subcategories', 'name description image status'); 

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { name, description, image, subcategories, status } = req.body;

        
        if (!name || !image) {
            return res.status(400).json({ message: 'Name and image are required fields' });
        }

        // Update category with subcategories and other fields
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, image, subcategories, status },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
