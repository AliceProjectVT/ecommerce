export default class ProductDTO {
    constructor(product) {
        this.title = product.title
        this.description = product.description
        this.thumbnail = product.image
        this.price = product.price
        this.stock = product.stock
        this.category = product.category
        this.availability = product.availability
        this.alt = product.alt
    }
}
