import Sequelize from "sequelize";
import task from "./task.model.js";
import user from "./user.model.js";
import {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} from "../config/index.js";

console.log(process.env.process);
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  operationsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = user(sequelize, Sequelize);
db.tasks = task(sequelize, Sequelize);

export default db;
