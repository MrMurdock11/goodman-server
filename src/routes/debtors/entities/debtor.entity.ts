import { AutoMap } from "@automapper/classes";

export class DebtorEntity {
	@AutoMap()
	id: string = "";

	@AutoMap()
	fullName: string = "";

	@AutoMap()
	personalInsurancePolicyNumber: string = "";

	@AutoMap()
	individualTaxpayerNumber: string = "";

	@AutoMap()
	birthday: string = "";

	@AutoMap()
	placeOfBirth: string = "";

	@AutoMap()
	registrationAddress: string = "";
}
