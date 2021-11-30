import { Low, JSONFile } from "lowdb";
import path from "path";
import { fileURLToPath } from "url";
import { DebtorEntity } from "@routes/debtors/entities/debtor.entity";
import { ManagerEntity } from "@routes/managers/entities/manager.entity";

export type Database = {
	managers: ManagerEntity[]
	debtors: DebtorEntity[]
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = path.join(__dirname, "../db.json");
const adapter = new JSONFile<Database>(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read()

// If file.json doesn't exist, db.data will be null
// Set default data
db.data === null ? { managers: [], debtors: [] } : db.data;

export default db;
