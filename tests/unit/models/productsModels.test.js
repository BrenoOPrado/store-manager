const { expect } = require('chai');
const sinon = require('sinon');
const productsDB = require('../../../src/models/productsDB');
const connection = require('../../../src/models/db/connection');

const {
  productsGetAll,
  productsGetById,
  bodyInsert,
  getAllInserted,
  bodyUpdated,
  productsUpdated,
} = require('../../mocks/products');

describe('Testes de unidade do model de produtos', function () {

  it('Realizando uma operação SELECT de todos os produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves(productsGetAll);

    const result = await productsDB.findAll();

    expect(result).to.equal(productsGetAll);
  });

  it('Realizando uma operação SELECT de um dos produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves(productsGetById);

    const result = await productsDB.findById(1);

    expect(result).to.equal(productsGetById);
  });

  it('Realizando uma operação INSERT de um novo produto com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves({});
    await productsDB.insert(bodyInsert.name);
    sinon.restore();

    sinon.stub(connection, 'execute').resolves(getAllInserted);
    const allResult = await productsDB.findAll();

    expect(allResult).to.be.length(4);
  });

  it('Realizando uma operação UPDATE em um dos produtos com o model productsDB', async function () {
    sinon.stub(connection, 'execute').resolves({});
    const updateParam = { name: bodyUpdated.name, id: 1 };
    await productsDB.update(updateParam);
    sinon.restore();

    sinon.stub(connection, 'execute').resolves(productsUpdated);
    const resultById = await productsDB.findById(1);
    expect(resultById).to.equal(productsUpdated);
  });
  
  afterEach(() => {
    sinon.restore();
  });

});