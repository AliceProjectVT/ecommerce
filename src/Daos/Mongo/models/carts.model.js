import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                },
                qty: { type: Number, required: true, default: 1 },
            },
        ],
    },
});

const cartModel = mongoose.model(cartsCollection, cartSchema);
cartSchema.pre('findOne', function () {
    this.populate('products.product');
});

export default cartModel;