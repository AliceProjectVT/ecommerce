import { Schema, model, mongoose } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import bcrypt from "bcrypt"

const usercollection = 'users'



const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    },


    //ID carro personal.
    // cartId: { type: mongoose.SchemaTypes.ObjectId, ref: "carts" },

},

    //Timestamp nos da el registro de la fecha y hora de creación / actualización 
    {
        timestamps: true,
        versionKey: false
     }
)


userSchema.plugin(mongoosePaginate)

const userModel = model(usercollection, userSchema)

export default userModel