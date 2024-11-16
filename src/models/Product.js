import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    brand: { 
        type: String 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, required: true 
    },
    discountPercentage: { 
        type: Number 
    },
    discountedPrice: { 
        type: Number 
    },
    sku: { 
        type: String 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', 
        required: true 
    }, 
    tags: [{ 
        type: String 
    }],
    attributes: {
        type: {
            type: String
        },
        manufacturingDate: {
            type: Date
        },
        shelfLife: {
            type: Number
        }
    },
    stock: { 
        type: Number, 
        default: 0 
    },
    images: {
        primary: { 
            type: String 
        },
        thumbnails: [{ 
            type: String 
        }]
    },
    reviews: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review' 
    }], 
    recommended: { 
        type: Boolean, default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', productSchema);
