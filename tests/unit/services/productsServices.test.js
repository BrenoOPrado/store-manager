const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');

describe('Testando products service', function () {
  describe('Validando o name', function () {
    const validationName = require('../../../src/services/middlewares/products/validationName');

    it('Caso de sucesso', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validationName({ body: { name: 'exemplo_de_nome' } }, res, next);

      expect(next).to.have.been.calledOnceWith();
    });

    it('Caso de nome não encontrado', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validationName({ body: {} }, res, next);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({
        message: '"name" is required',
      });
    });

    it('Caso de nome com menos de 5 caracteres', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validationName({ body: { name: 'erro' } }, res, next);

      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

  describe('Validando o produto', function () {
    const validationProductId = require('../../../src/services/middlewares/products/validationProductId');
    const productsDB = require('../../../src/models/productsDB');
    const mock = require('../controllers/mocks/products');

    it('Caso de sucesso', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(connection, 'execute').resolves([mock.productsGetAll]);

      await validationProductId({ params: { id: '1' } }, res, next);

      expect(next).to.have.been.calledOnceWith();
    });

    it('Caso de produto não encontrado', async function () {
      const next = sinon.stub().returns(() => { })
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(connection, 'execute').resolves([mock.productsGetAll]);

      await validationProductId({ params: { id: '99999999' } }, res, next);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({
        message: 'Product not found',
      });
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});