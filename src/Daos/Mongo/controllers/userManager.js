import userModel from "../models/userModels.js";

class userManagerMongo {
    constructor() {
        this.model = userModel
    }


    async getUsers() {
        try {
            return await this.model.find({})

        } catch (error) {
            console.log(error)
        }
    }
    async getUser(filter) {
        return await this.model.findOne({ filter })
    }
    async createUser(newUser) {
        return await this.model.create(newUser)

    }
    async updateUser() { }
    async deleteUser() { }
}

export default userManagerMongo     