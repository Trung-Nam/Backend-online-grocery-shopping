import Category from '~/models/Category';
import Subcategory from '~/models/Subcategory';

// Get all subcategories
const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories', error });
    }
};

// Create a new subcategory
const createSubcategory = async (req, res) => {
    try {
        const { name, description, image, category } = req.body;
        const newSubcategory = new Subcategory({ name, description, image, category });
        await newSubcategory.save();
        const categoryData = await Category.findById(category);
        categoryData.subcategory.push(newSubcategory._id);
        await categoryData.save();
        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subcategory', error });
    }
};


// Get a single subcategory by ID
const getSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id).populate('category');
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategory', error });
    }
};

// Update a subcategory
const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subcategory', error });
    }
};

// Delete a subcategory
const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        const category = await Category.findById(subcategory.category);
        category.subcategory.pull(subcategory._id);
        await category.save();
        res.status(200).json({ message: 'Subcategory deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subcategory', error });
    }
};

module.exports = {
    getSubcategories,
    createSubcategory,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
}
