module.exports = async function validationQuantity(req, res, next) {
  const { body } = req;

  const empty = body.some((item) => item.quantity === undefined);
  if (empty) {
    return res.status(400).json({
      message: '"quantity" is required',
    });
  }

  const smaller = body.some((item) => item.quantity <= 0);
  if (smaller) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }

  next();
};