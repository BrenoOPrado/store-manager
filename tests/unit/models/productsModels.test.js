const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsDB = require('../../../src/models/productsDB');

const { products, updatedProducts } = require('./mocks/products');

describe('Testes de unidade do model de produtos', function () {
  it('Realizando uma operação SELECT de todos os produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productsDB.findAll();
    console.log('1');
    console.log(result);

    expect(result).to.equal(products);
  });

  it('Realizando uma operação SELECT de um dos produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productsDB.findById(1);
    console.log('2');
    console.log(result);

    expect(result).to.equal(products[0]);
  });

  it('Realizando uma operação INSERT de um produto com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves([...products, { id: 4, name: 'exemplo de teste' }]);

    const result = await productsDB.insert('exemplo de teste');
    console.log('3');
    console.log(result);

    expect(result).to.equal(updatedProducts);
  });

  afterEach(sinon.restore);
});