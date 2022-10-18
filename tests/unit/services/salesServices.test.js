const { expect } = require('chai');
const sinon = require('sinon');

const { bodyInsert } = require('../controllers/mocks/sales');

describe('Testando sales service', function () {
  describe('Validando a quantidade', function () {
    const validationQuantity = require('../../../src/services/middlewares/sales/validationQuantity');

    it('Caso de sucesso', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validationQuantity({ body: bodyInsert }, res, next);

      expect(next).to.have.been.calledOnceWith();
    });

    it('Caso de quantidade não encontrada', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validationQuantity({ body: {} }, res, next);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({
        message: '"quantity" is required',
      });
    });

    it('Caso de quantidade menor que 1', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validationQuantity({ body: [{ quantity: 0 }] }, res, next);

      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  describe('Validando o produto', function () {
    const validationProductId = require('../../../src/services/middlewares/sales/validationProductId');
    const salesDB = require('../../../src/models/salesDB');
    const mock = require('../controllers/mocks/sales');

    it('Caso de sucesso', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesDB, 'findById').resolves([mock.salesGetById, null]);

      await validationProductId({ body: [{ productId: 1 }] }, res, next);

      expect(next).to.have.been.calledOnceWith();
    });

    it('Caso de não possuir um produto', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesDB, 'findById').resolves([mock.salesGetById, null]);

      await validationProductId({ body: [{ }] }, res, next);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({
        message: '"productId" is required',
      });
    });

    it('Caso de produto não encontrado', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesDB, 'findById').resolves([mock.salesGetById, null]);

      await validationProductId({ body: [{ productId: 99999999 }] }, res, next);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({
        message: 'Product not found',
      });
    });
  });

  describe('Validando a venda', function () {
    const validationSalesId = require('../../../src/services/middlewares/sales/validationSalesId');
    const salesDB = require('../../../src/models/salesDB');
    const mock = require('../controllers/mocks/sales');

    it('Caso de sucesso', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesDB, 'findAll').resolves([mock.salesGetAll, null]);

      await validationSalesId({ params: '1' }, res, next);

      expect(next).to.have.been.calledOnceWith();
    });

    it('Caso de quantidade não encontrada', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesDB, 'findAll').resolves([mock.salesGetAll, null]);

      await validationSalesId({ params: '99999999' }, res, next);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({
        message: 'Sale not found',
      });
    });
  });
});