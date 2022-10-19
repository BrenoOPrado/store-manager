const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const connection = require('../../../src/models/db/connection');

const {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  removeProduct,
} = require('../../../src/controllers/productController');

const {
  productsGetAll,
  productsGetById,
  bodyInsert,
  productsInsert,
  bodyUpdated,
  productsUpdated,
} = require('./mocks/products');

describe('Testes de unidade do controller de products', function () {
  it('Realizando uma operação de retornar todos os produtos com o controller getAll', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([productsGetAll]);

    await getAll({}, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(productsGetAll);
  });

  it('Realizando uma operação de retornar um dos produtos com o controller getById', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([[productsGetById]]);

    await getById({ params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(productsGetById);
  });

  it('Realizando uma operação de retornar o novo produto adicionado com o controller insertProduct', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([[productsInsert]]);

    await insertProduct({ body: bodyInsert }, res);

    expect(res.status).to.have.been.calledOnceWith(201);
    expect(res.json).to.have.been.calledOnceWith(productsInsert);
  });

  it('Realizando uma operação de retornar o produto atualizado com o controller updateProduct', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves({});

    await updateProduct({ body: bodyUpdated, params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(productsUpdated);
  });

  it('Realizando uma operação de um produto com o controller removeProduct', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves({});

    await removeProduct({ params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledOnceWith(204);
    expect(res.json).to.have.been.calledOnceWith();
  });

  afterEach(() => {
    sinon.restore();
  });
});