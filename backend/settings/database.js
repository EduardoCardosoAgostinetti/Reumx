const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const sequelizeDefault = new Sequelize("postgres", DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

async function ensureDatabase() {
  try {
    const [results] = await sequelizeDefault.query(
      `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';`
    );

    if (results.length === 0) {

      await sequelizeDefault.query(`CREATE DATABASE "${DB_NAME}";`);

    }
  } catch (err) {
    console.error("Erro ao verificar/criar banco:", err);
  }
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize, ensureDatabase };
