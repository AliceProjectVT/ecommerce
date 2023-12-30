import { productService } from "../services/service.js";
import { logger } from '../middleware/loggers.js'


// se instancia la clase de productos


// funcion para obtener todos los productos
const getProducts = async (req, res) => {
    try {
        // obtiene parametros de consulta (query parameters)
        // Aquí se extraen tres parámetros: page, limit, y sortBy.
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const sortBy = req.query.sortBy || "price";

        //parseInt se utiliza para convertir los valores de los parametros de consulta a números enteros. Si no se proporciona un parametro específico, se establece un valor predeterminado (page=1, limit=20 y sortBy="price").
        const options = { page: page, limit: limit, sort: { [sortBy]: 1 } };

        //productos paginados desde el DAO (Data Access Object) el DAO realiza una consulta a la base de datos para obtener los productos según las opciones proporcionadas.
        const result = await productService.getPaginatedProducts(options);

        // condicional si !NO encuentra los productos retorna un error 
        if (!result.products.length) {
            return res.status(404).json({ message: "Productos no encontrados" });
        }

        // si todo sale bien muestra los productos
        res.json({
            products: result.products,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });

        //si todo sale mal muestra el error maximo
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

// obtener un producto especifico segun id 
const getProductById = async (req, res) => {
    const productId = req.params.pid;
    try {
        const result = await productService.getProductById(productId);
        if (!result) {
            res.status(404).json({ message: "Producto no encontrado" });
        } else {
            const formattedProduct = {
                title: result.title,
                description: result.description,
                price: result.price,
                stock: result.stock,
                category: result.category,
                thumbnails: result.thumbnails,
                createdBy: result.createdBy,
                quantity: result.quantity,
                isValid: result.isValid,
            };
            res.status(200).render("productDetail", { product: formattedProduct });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
};

// funcion para crear un nuevo producto y funcion para verificar si el producto es valido antes de crearlo
function isValidProduct(product) {
    // primero valida que product sea un objeto 
    if (!product || typeof product !== "object") {
        return false;
    }

    // se desestructura el objeto product para obtener cada propiedad
    const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    } = product;

    // validacion se tipo string o number en cada propiedad
    if (
        typeof title === "string" &&
        typeof description === "string" &&
        typeof code === "string" &&
        typeof price === "number" &&
        typeof stock === "number" &&
        typeof category === "string" &&
        typeof thumbnails === "string"
    ) {
        return true;
    } else {
        return false;
    }
    // si se cumplen las validaciones retorna true (producto valido y continua con la funcion saveproduct)

}

const saveProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        if (!isValidProduct(newProduct)) {
            // throw new ProductCreationError("datos del producto invalidos"); 
            logger.error("datos del producto invalidos");
        }

        // Asigna el usuario autenticado al producto antes de guardarlo
        newProduct.owner = req.user.email; // Asigna el email del usuario autenticado al campo owner del producto


        const result = await productService.saveProduct(newProduct);
        logger.info("Producto creado correctamente:", result);
        res.json({ status: "success producto creado", result: result });
    } catch (error) {
        // if (error instanceof ProductCreationError) {
        //     logger.error("Error al crear el producto:", error.message);
        //     res.status(error.statusCode).send({ status: "error", error: error.message });
        // } else {
        logger.error("Error general al crear el producto:", error);
        console.error(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
        // }
    }
};

//SAVEPRODUCT ANTIGUO EN CASO DE ERROR
/* const saveProduct = async (req, res) => {
    const newProduct = req.body;
    try {           
        const result = await productService.saveProduct(newProduct);
        res.json({ status: "success producto creado", result: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
}; */

// actualizar un producto especifico segun id
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    // intenta acceder a un producto especifico de la base de datos y mediante postman se modifica lo que se requiere y lo que no se mantiene tal cual esta 
    try {
        const result = await productService.updateProduct(productId, updatedProduct);
        logger.info("Producto actualizado correctamente:", result);
        res.json({ status: "success producto actualizado", result: result });
    } catch (error) {
        logger.error("Error al actualizar el producto:", error);
        console.log(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
};

// eliminar un producto especifico segun id
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const user = req.user; // Usuario autenticado

    try {
        // Buscar el producto por su ID
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // verifica si el usuario creo el producto
        if (user.rol === "premium" && product.owner !== user.email) {
            return res.status(403).json({ message: "No tienes permisos para eliminar este producto" });
        }

        const result = await productService.deleteProduct(productId);
        logger.info("Producto eliminado correctamente:", result);
        res.json({ status: "success producto eliminado", result: result });
    } catch (error) {
        logger.error("Error al eliminar el producto:", error);
        console.log(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
};






//!!! API PRODUCTS
const getItems = async (req, res) => {
    try {
        const result = await productService.get();
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
}
const getItem = async (req, res) => {
    try {
        const result = await productService.getBy();
        res.json({ status: "success", result: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
}
const createItem = async (req, res) => {
    const newProduct = req.body;
    try {
        const result = await productService.create(newProduct);
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Algo salio mal intenta mas tarde" });
    }
}
async (req, res) => {
    const newProduct = req.body;
    try {
        if (!isValidProduct(newProduct)) {
            logger.error("datos del producto invalidos");
        }

        newProduct.owner = req.user.email; // Asigna el email del usuario autenticado al campo owner del producto


        const result = await productService.saveProduct(newProduct);
        logger.info("Producto creado correctamente:", result);
        res.json({ status: "success producto creado", result: result });
    } catch (error) {

        logger.error("Error general al crear el producto:", error);
        console.error(error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });

    }
};
const deleteItem = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productService.getBy({ _id: pid });
        if (product) {
            await productService.delete({ _id: pid });
            res.status(200).json({ status: "success", message: "Producto eliminado correctamente" });
        } else {

            res.status(404).json({ message: 'Producto no encontrado' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
}

const updateItem = async (req, res) => {
    try {

        const findProduct = await productService.getBy({ _id: req.params.pid });

        if (!findProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        findProduct.title = req.body.title || findProduct.title;
        findProduct.description = req.body.description || findProduct.description;
        findProduct.price = req.body.price || findProduct.price;
        findProduct.stock = req.body.stock || findProduct.stock;
        findProduct.category = req.body.category || findProduct.category;
        findProduct.thumbnails = req.body.thumbnails || findProduct.thumbnails;
        findProduct.quantity = req.body.quantity || findProduct.quantity;
        findProduct.isValid = req.body.isValid || findProduct.isValid;

        const updatedProduct = await productService.update({ _id: req.params.pid }, findProduct);

        if (updatedProduct.nModified > 0) {
            res.status(200).json({ status: "success", message: "Producto actualizado correctamente", data: updatedProduct });
        } else {
            res.status(404).json({ status: "error", message: "Documento no encontrado o no se realizaron cambios", data: updatedProduct });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Error interno del servidor" });
    }
};


export {
    getProducts,
    getProductById,
    saveProduct,
    deleteProduct,
    updateProduct,
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem,
};