import Category from '~/models/Category';

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategory');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const category = new Category({ name, description, image });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};


// Get a single category by ID
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('subcategory');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
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
        res.status(500).json({ message: 'Error deleting category', error });
    }
};

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}