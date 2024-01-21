import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products";

const productSchema = new Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
        maxlength: 100,
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
        maxlength: 20,
        required: true
    },
    thumbnails: {
        type: String,
        maxlength: 100,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
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
    //?___________________________________________Mouske Herramienta misteriosa que utilizaremos mas tarde._____________________________________
    // creationTimestamp: {
    //     type: Date,
    //     default: Date.now()
    // },
    // updateTimestamp: {
    //     type: Date,
    //     default: Date.now()
    // }

});

productSchema.plugin(mongoosePaginate);

const productModel = model(productsCollection, productSchema)

export default productModel;