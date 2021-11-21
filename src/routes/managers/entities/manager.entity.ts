import { AutoMap } from "@automapper/classes";

export class ManagerEntity {
	@AutoMap()
	id: Uuid = "";

	@AutoMap()
	fullName: string = "";

	@AutoMap()
	address: string = "";

	@AutoMap()
	phone: string = "";

	@AutoMap()
	email: Email = "";
}
