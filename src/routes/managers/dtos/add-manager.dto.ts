import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class AddManagerDto {
	@AutoMap()
	fullName: string = "";

	@AutoMap()
	address: string = "";

	@AutoMap()
	phone: string = "";

	@AutoMap()
	email: Email = "";
}
