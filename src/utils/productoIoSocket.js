const products = [
        {
                title: "producto prueba",
                description: "descripcion producto prueba",
                price: 1500,
                img: "ruta prueba",
                code: "001",
                stock: 1500,
                id: 1
        },
        {
                title: "producto prueba",
                description: "descripcion producto prueba",
                price: 1500,
                img: "ruta prueba",
                code: "002",
                stock: 1500,
                id: 2
        }
];

const productsIoSocket = (io) => {
        io.on('connection', (socket) => {
                // console.log('cliente conectado');
                io.emit('products', products);

                socket.on('addProduct', newProduct => {
                        // console.log(newProduct);
                        // managerPRoduct.create() obtener los productos
                        products.push({ id: products.length + 1, ...newProduct }); // manager
                        // console.log(products);
                        io.emit('products', products);
                }); // cuando alguien cree un nuevo producto
        });
};

export default productsIoSocket;
