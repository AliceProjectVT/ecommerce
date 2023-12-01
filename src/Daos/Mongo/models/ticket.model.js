import mongoose from "mongoose"

const ticketsCollection = "ticket";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: Date,
    amount: Number,
    purchaser: String,
})

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema)

export default ticketsModel