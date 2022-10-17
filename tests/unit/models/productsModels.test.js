const { expect } = require('chai');
const productsDB = require('../../../src/models/productsDB');

const {
  productsGetAll,
  productsGetById,
  bodyInsert,
  productsInsert,
  bodyUpdated,
  productsUpdated,
} = require('./mocks/products');

describe('Testes de unidade do model de produtos', function () {
  it('Realizando uma operação SELECT de todos os produtos com o model productsDB', async function () {
    const [result] = await productsDB.findAll();

    expect(result).to.equal(productsGetAll);
  });

  it('Realizando uma operação SELECT de um dos produtos com o model productsDB', async function () {
    const [result] = await productsDB.findById(1);

    expect(result).to.equal(productsGetById);
  });

  it('Realizando uma operação INSERT de um novo produto com o model productsDB', async function () {
    await productsDB.insert(bodyInsert.name);
    const [allResult] = await productsDB.findAll();

    expect(allResult).to.be.length(4);

    const [resultById] = await productsDB.findById(4);
    expect(resultById).to.equal(productsInsert);
  });

  it('Realizando uma operação UPDATE em um dos produtos com o model productsDB', async function () {
    const updateParam = { name: bodyUpdated.name, id: 1 };
    await productsDB.update(updateParam);

    const [resultById] = await productsDB.findById(1);
    expect(resultById).to.equal(productsUpdated);
  });
});