import { AutoMap } from "@automapper/classes";
import { v4 } from "uuid";

export class Manager {
	id: Uuid = v4();

	@AutoMap()
	fullName: string = "";

	@AutoMap()
	address: string = "";

	@AutoMap()
	phone: string = "";

	@AutoMap()
	email: Email = "";
}

export type FinancialManager = {
	fullName: string;
	fullNameGenitive: string;
	initials: string;
	address: string;
	phone: string;
	email: Email;
};
