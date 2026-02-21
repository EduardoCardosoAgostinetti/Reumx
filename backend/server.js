require("dotenv").config({ path: "../.env", quiet: true });
const app = require("./app");
const { sequelize, ensureDatabase } = require("./settings/database");

const port = process.env.API_PORT;

async function startServer() {
  await ensureDatabase();
  await sequelize.sync({ force: true });
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  });
}

startServer();