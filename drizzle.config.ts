import "dotenv/config";

import { defineConfig } from "drizzle-kit";

import {} from "module";

export default defineConfig({
  dialect: "postgresql", // or "mysql2", "sqlite", "mariadb", "mssql"
  // ...
  // Define your configuration here
  schema: "./src/drizzle/schema.ts",

  //define where your migration will go
  out: "./src/drizzle/migrations",

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});

// module.exports = {
//   client: "postgres", // or 'postgres'
//   connection: {
//     host: "localhost",
//     user: "postgres",
//     password: "1234567890",
//     database: "socialmedia",
//     port: 5432,
//   },
// };
