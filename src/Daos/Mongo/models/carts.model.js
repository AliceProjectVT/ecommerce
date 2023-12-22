import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                qty: { type: Number, required: true, default: 1 },
            },
        ],
    },
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;