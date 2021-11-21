import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class AddManagerDto {
	@AutoMap()
	@Expose()
	fullName: string = "";

	@AutoMap()
	@Expose()
	address: string = "";

	@AutoMap()
	@Expose()
	phone: string = "";

	@AutoMap()
	@Expose()
	email: Email = "";
}
