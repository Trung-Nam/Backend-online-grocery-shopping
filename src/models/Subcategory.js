import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the parent category
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true // Automatically adds createdAt and updatedAt fields
}
);

export default mongoose.model('Subcategory', subcategorySchema);
