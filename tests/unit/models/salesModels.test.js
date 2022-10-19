const { expect } = require('chai');
const sinon = require('sinon');
const salesDB = require('../../../src/models/salesDB');
const connection = require('../../../src/models/db/connection');

const {
  salesGetAll,
  salesGetById,
} = require('../../mocks/sales');

describe('Testes de unidade do model de sales', function () {
  it('Realizando uma operação SELECT de todos as sales_products com o model salesDB', async function () {
    sinon.stub(connection, 'execute').resolves(salesGetAll);
    const result = await salesDB.findAll();

    expect(result).to.be.length(3);

    for (let i = 0; i < result.length; i += 1) {
      expect(result[i]).to.be.haveOwnProperty("saleId");
      expect(result[i]).to.be.haveOwnProperty("productId");
      expect(result[i]).to.be.haveOwnProperty("quantity");
      expect(result[i]).to.be.haveOwnProperty("date");
    }

    expect(result[0].saleId).to.equal(1);
    expect(result[1].saleId).to.equal(1);
    expect(result[2].saleId).to.equal(2);
  });

  it('Realizando uma operação SELECT de uma das sales_products com o model salesDB', async function () {
    sinon.stub(connection, 'execute').resolves(salesGetById);
    const result = await salesDB.findById(1);

    expect(result).to.be.length(2);

    for (let i = 0; i < result.length; i += 1) {
      expect(result[i]).to.be.haveOwnProperty("productId");
      expect(result[i]).to.be.haveOwnProperty("quantity");
      expect(result[i]).to.be.haveOwnProperty("date");
    }
  });

  it('Realizando uma operação INSERT de uma nova sale com o model salesDB', async function () {
    sinon.stub(connection, 'execute').resolves({});
    await salesDB.insertSaleDate();
    sinon.restore();

    sinon.stub(connection, 'execute')
      .resolves([{ id: 1, date: '' }, { id: 2, date: '' }, { id: 3, date: '' }]);
    const result = await connection
      .execute(
        'SELECT * FROM sales ORDER BY id',
      );

    expect(result).to.be.length(3);

    for (let i = 0; i < result.length; i += 1) {
      expect(result[i]).to.be.haveOwnProperty("id");
      expect(result[i]).to.be.haveOwnProperty("date");
      expect(result[i].id).to.equal(i + 1);
    }
  });

  it('Realizando uma operação INSERT de uma nova sale_product com o model salesDB', async function () {
    const insertSale = {
      id: 3,
      productId: 4,
      quantity: 20,
      date: '',
    };

    const insertSaleAll = [
      ...salesGetAll,
      insertSale,
    ];
    
    sinon.stub(connection, 'execute').resolves({});
    await salesDB.insertSaleProduct({ itemsSold: insertSale });
    sinon.restore();

    sinon.stub(connection, 'execute').resolves(insertSaleAll);
    const result = await salesDB.findAll();

    expect(result).to.be.length(4);

    for (let i = 0; i < result.length; i += 1) {
      expect(result[i]).to.be.haveOwnProperty("saleId");
      expect(result[i]).to.be.haveOwnProperty("productId");
      expect(result[i]).to.be.haveOwnProperty("quantity");
      expect(result[i]).to.be.haveOwnProperty("date");
    }
  });

  afterEach(() => {
    sinon.restore();
  });
});