const { expect } = require('chai');
const salesDB = require('../../../src/models/salesDB');
const conn = require('../../../src/models/db/connection');

describe('Testes de unidade do model de sales', function () {
  it('Realizando uma operação SELECT de todos os produtos com o model salesDB', async function () {
    const [result] = await salesDB.findAll();

    expect(result.length).toBe(3);

    for (let i = 0; i < result.length; i += 1) {
      expect(result[i]).toHaveProperty("saleId");
      expect(result[i]).toHaveProperty("productId");
      expect(result[i]).toHaveProperty("quantity");
      expect(result[i]).toHaveProperty("date");

      expect(result[i].productId).toEqual(i + 1);
      expect(result[i].quantity).toEqual((i + 1) * 5);
      expect(result[i].date).toBeDefined();
    }

    expect(result[0].saleId).toEqual(1);
    expect(result[1].saleId).toEqual(1);
    expect(result[2].saleId).toEqual(2);
  });
});