import Subcategory from "~/models/Subcategory";

// Create a new SubCategory
exports.createSubCategory = async (req, res) => {
  try {
    const { name, category_id, description } = req.body;

    const subCategory = new Subcategory({
      name,
      category_id,
      description,
    });

    const savedSubCategory = await subCategory.save();
    res.status(201).json(savedSubCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory', error });
  }
};

// Get all SubCategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await Subcategory.find().populate('category_id', 'name');
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

// Get a SubCategory by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await Subcategory.findById(id).populate('category_id', 'name');

    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategory', error });
  }
};

// Update a SubCategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedSubCategory = await Subcategory.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error });
  }
};

// Delete a SubCategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubCategory = await Subcategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error });
  }
};
