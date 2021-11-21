import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class AddDebtorDto {
	@AutoMap()
	@Expose()
	public fullName: string = "";

	@AutoMap()
	@Expose()
	public personalInsurancePolicyNumber: string = "";

	@AutoMap()
	@Expose()
	individualTaxpayerNumber: string = "";

	@AutoMap()
	@Expose()
	birthday: string = "";

	@AutoMap()
	@Expose()
	placeOfBirth: string = "";

	@AutoMap()
	@Expose()
	registrationAddress: string = "";
}
