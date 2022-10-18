const app = require('./app');
const conn = require('./models/db/connection')();
/* require('dotenv').config(); */

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, async () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
  await conn.query('SELECT 1');
});
