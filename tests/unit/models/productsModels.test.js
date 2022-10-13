const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsDB = require('../../../src/models/productsDB');

const mock = require('./mocks/products');

describe('Testes de unidade do model de produtos', function () {
  it('Realizando uma operação SELECT de todos os produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productsDB.findAll();

    expect(result).to.equal(mock);
  });

  it('Realizando uma operação SELECT de um dos produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productsDB.findById(1);

    expect(result).to.equal(mock[0]);
  });

  it('Realizando uma operação INSERT de um produto com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves([...mock, { id: 4, name: 'exemplo de teste' }]);

    const result = await productsDB.insert('exemplo de teste');
    console.log(result);

    expect(result).to.equal({ id: 4, name: 'exemplo de teste' });
  });

  afterEach(sinon.restore);
});