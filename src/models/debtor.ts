import { AutoMap } from "@automapper/classes";
import { v4 } from "uuid";

export class Debtor {
	id: Uuid = v4();

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

export type TDebtor = {
	fullName: string;
	fullNameGenitive: string;
	fullNameInstrumental: string;
	// СНИЛС
	personalInsurancePolicyNumber: string;
	// ИНН
	individualTaxpayerNumber: string;
	birthday: string;
	placeOfBirth: string;
	registrationAddress: string;
};
