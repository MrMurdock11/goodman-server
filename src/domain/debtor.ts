import { inclineFullName } from "@helper/incline-full-name.helper";

export type Debtor = {
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

/**
 *
 *
 * @export
 * @param {string} fullName
 * @param {string} personalInsurancePolicyNumber
 * @param {string} individualTaxpayerNumber
 * @param {string} birthday
 * @param {string} placeOfBirth
 * @param {string} registrationAddress
 * @return {Debtor}
 */
export function createDebtor(
	fullName: string,
	personalInsurancePolicyNumber: string,
	individualTaxpayerNumber: string,
	birthday: string,
	placeOfBirth: string,
	registrationAddress: string
): Debtor {
	const fullNameGenitive = inclineFullName(fullName, "genitive");
	const fullNameInstrumental = inclineFullName(fullName, "instrumental");

	return {
		fullName,
		fullNameGenitive,
		fullNameInstrumental,
		personalInsurancePolicyNumber,
		individualTaxpayerNumber,
		birthday,
		placeOfBirth,
		registrationAddress,
	};
}
