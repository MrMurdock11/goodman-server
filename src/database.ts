import { Low, JSONFile } from "lowdb";
import path from "path";
import { fileURLToPath } from "url";
import { DebtorEntity } from "@routes/debtors/entities/debtor.entity";
import { ManagerEntity } from "@routes/managers/entities/manager.entity";
import { CourthouseEntity } from "@routes/courthouses/entities/courthouse.entity";

export type Database = {
	managers: ManagerEntity[];
	debtors: DebtorEntity[];
	courthouses: CourthouseEntity[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const file = path.join(__dirname, "../db.json");
const adapter = new JSONFile<Database>(file);
const db = new Low(adapter);

await db.read()

db.data === null ? { managers: [], debtors: [], courthouses: [] } : db.data;

export default db;
