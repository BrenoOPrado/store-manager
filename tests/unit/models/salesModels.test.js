const { expect } = require('chai');
const salesDB = require('../../../src/models/salesDB');
const conn = require('../../../src/models/db/connection');

describe('Testes de unidade do model de sales', function () {
  it('Realizando uma operação SELECT de todos as sales_products com o model salesDB', async function () {
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

  it('Realizando uma operação SELECT de uma das sales_products com o model salesDB', async function () {
    const [result] = await salesDB.findById(1);

    expect(result.length).toBe(2);

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
  });

  it('Realizando uma operação INSERT de uma nova sale com o model salesDB', async function () {
    await salesDB.insertSaleDate()
    const [result] = await conn
      .execute(
        'SELECT * FROM sales ORDER BY id',
      );

    expect(result.length).toBe(3);

    for (let i = 0; i < result.length; i += 1) {
      expect(result[i]).toHaveProperty("id");
      expect(result[i]).toHaveProperty("date");

      expect(result[i].id).toEqual(i + 1);
      expect(result[i].date).toBeDefined();
    }
  });

  it('Realizando uma operação INSERT de uma nova sale_product com o model salesDB', async function () {
    const insertSale = {
      id: 3,
      productId: 4,
      quantity: 20,
    };
    
    await salesDB.insertSaleProduct(insertSale);
    const [result] = await conn
      .execute(
        `SELECT sale_id AS saleId,
        product_id AS productId,
        quantity FROM sales_products
        ORDER BY sale_id`,
      );

    expect(result.length).toBe(4);

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
    expect(result[3].saleId).toEqual(3);
  });
});