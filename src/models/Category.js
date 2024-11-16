import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    subcategories: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
    }],
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true // This adds `createdAt` and `updatedAt` fields automatically
    });

export default mongoose.model('Category', categorySchema);
