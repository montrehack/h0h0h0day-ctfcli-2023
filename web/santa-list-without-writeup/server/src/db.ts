import Database from "better-sqlite3";
import { existsSync } from "node:fs";
import { data } from "./data.js";

const DB_FILE = "./db.sqlite";

const FLAG = "FLAG-6rPC_15_50_53CUr3";

export interface EntryModel {
  id: number;
  name: string;
  type: string;
  gift: string;
  location: string;
}

if (!existsSync(DB_FILE)) {
  const tempDB = new Database(DB_FILE, {
    verbose: console.log,
  });

  tempDB.exec(`
CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    gift TEXT,
    location TEXT
);`);

  const insert = tempDB.prepare(
    "INSERT INTO entries (name, type, gift, location) VALUES (@name, @type, @gift, @location)"
  );

  tempDB.transaction((entries) => {
    for (const entry of entries) insert.run(entry);
  })(data);

  tempDB.exec(
    `CREATE TABLE flag (id INTEGER PRIMARY KEY AUTOINCREMENT, flag TEXT);`
  );

  tempDB.prepare(`INSERT INTO flag (flag) VALUES (@flag);`).run({ flag: FLAG });
}

const db = new Database(DB_FILE, {
  readonly: true,
  verbose: console.log,
});

export { db };
