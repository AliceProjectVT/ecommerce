import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const collection = 'products'
const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,

    },
    stock: {
        type: Number,
        required: true,
    },
    category: String,
    thumbnail: String,
    alt: String,
    availabilty: { type: String, enum: ['in_stock', 'out_stock'] }

})

productsSchema.plugin(mongoosePaginate)


const producstModel = model(collection, productsSchema)

export default producstModel