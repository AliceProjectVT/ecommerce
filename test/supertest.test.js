import { ok } from "assert";
import * as chai from "chai";
import { stat } from "fs";
import _ from "mongoose-paginate-v2";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest('http://localhost:4000');

describe('test', () => {
  describe('test de products', () => {
    //!!! SE RECOMIENDA CREAR VARIOS PRODUCTOS PARA REEMPLAZAR PARAMETROS DE ID EN LOS OTROS ENDPOINTS
    it('El endpoint POST /api/products debe crear un nuevo producto correctamente', async () => {
      const prodMock = {
        title: "Producto para eliminar",
        description: "Descripción del producto 1",
        price: 100,
        stock: 10,
        thumbnails: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Fvector%2Ficono",
        category: "Categoria 1",
        createdBy: "5f9b3b3b8b0b3b1b3b3b3b3b",
        quantity: 10
      };
      const { _body, ok } = await requester.post('/api/products').send(prodMock);

      expect(_body.result).to.have.property('_id');
      expect(ok).to.be.equal(true);
    });

    it('El endpoint GET /api/products debe devolver un array de productos', async () => {
      const { _body, ok } = await requester.get('/api/products');
      expect(ok).to.be.equal(true);
    });
    //*Se puede cambiar el ID por una de un producto creado anteriormente para que funcione correctamente
    it('El endpoint GET /api/products/:id debe devolver un producto con el id indicado', async () => {
      const { _body, ok } = await requester.get('/api/products/5f9b3b3b8b0b3b1b3b3b3b3b');
      expect(ok).to.be.equal(true);
    });
    //*Se puede cambiar el ID por una de un producto creado anteriormente para que funcione correctamente
    it('El endpoint PUT /api/products/:id debe obtener un producto y modificar parametros con la información enviada', async () => {
      const prodMock = {

        description: "esto es una descripcion",

      };
      const { ok } = await requester.put('/api/products/659b2aa284ce19a11e38a1c5').send(prodMock);
      expect(ok).to.be.equal(true);
    });

    //*Se puede cambiar el ID por una de un producto creado anteriormente para que funcione correctamente
    it('El endpoint DELETE /api/products/:id debe obtener un producto y eliminarlo', async () => {
      const { ok } = await requester.delete('/api/products/659b2aa284ce19a11e38a1c5');
      expect(ok).to.be.equal(true);
    });
  });
});
