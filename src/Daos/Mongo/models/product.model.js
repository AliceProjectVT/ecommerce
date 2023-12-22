import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 100,
        required: true
    },
    description: {
        type: String,
        max: 100,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        max: 20,
        required: true
    },
    thumbnails: {
        type: String,
        max: 100,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Referencia al modelo de usuario
    },
    quantity: {
        type: Number,
        default: 1
    },
    isValid: {
        type: Boolean,
        default: true
    }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema)

export default productModel;