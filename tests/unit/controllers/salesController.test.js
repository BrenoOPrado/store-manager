const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const connection = require('../../../src/models/db/connection');

const {
  getAll,
  getById,
  insertSale,
} = require('../../../src/controllers/salesController');

const {
  salesGetAll,
  salesGetById,
  bodyInsert,
  salesInsert,
} = require('./mocks/sales');

describe('Testes de unidade do controller de sales', function () {
  it('Realizando uma operação de retornar todas as vendas com o controller getAll', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([salesGetAll]);
    await getAll({}, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(salesGetAll);
  });

  it('Realizando uma operação de retornar uma das vendas com o controller getById', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([salesGetById]);

    await getById({ params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(salesGetById);
  });

  it('Realizando uma operação de retornar o novo produto adicionado com o controller insertSale', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    await insertSale({ params: bodyInsert }, res);

    expect(res.status).to.have.been.calledOnceWith(201);
    expect(res.json).to.have.been.calledOnceWith(salesInsert);
  });

  afterEach(() => {
    sinon.restore();
  });
});