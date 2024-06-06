//migration code
//
import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

// import { db } from "./db";
import db, { client } from "./db";

async function migration() {
  console.log("=======Migrating Database=======");
  // await db.createSchema();
  await migrate(db, {
    migrationsFolder: __dirname + "/migrations",
  });

  await client.end();

  console.log("=======Migration Complete=======");

  process.exit(0);
}

// run the migration function and catch any errors
migration().catch((err) => {
  console.error(err);
  process.exit(0);
}); // run the migration function and catch any errors
