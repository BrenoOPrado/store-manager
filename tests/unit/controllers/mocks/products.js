const productsGetAll = [
  {
    "id": 1,
    "name": "Martelo de Thor",
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América",
  },
];

// ------------------------------------------------

const productsGetById = [{
  "id": 1,
  "name": "Martelo de Thor",
}];

// ------------------------------------------------

const bodyInsert = {
  "name": "exemplo de teste",
}

const productsInsert = {
  "id": 4,
  "name": "exemplo de teste",
};

// ------------------------------------------------

const bodyUpdated = {
  "name": "Martelo do Batman",
}

const productsUpdated = {
  "id": 1,
  "name": "Martelo do Batman",
};

module.exports = {
  productsGetAll,
  productsGetById,
  bodyInsert,
  productsInsert,
  bodyUpdated,
  productsUpdated,
};