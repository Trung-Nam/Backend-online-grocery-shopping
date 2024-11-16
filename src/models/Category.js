import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
    }],
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model('Category', categorySchema);
