import { config } from "dotenv";

config();

export const {
  ENV,
  PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = process.env;
