import { getInitialsFullName } from "@helper/get-initials-full-name.helper";
import { inclineFullName } from "@helper/incline-full-name.helper";

export type FinancialManager = {
	fullName: string;

	fullNameGenitive: string;

	initials: string;

	address: string;

	phone: string;

	email: Email;
};

/**
 *
 *
 * @export
 * @param {string} fullName
 * @param {string} address
 * @param {string} phone
 * @param {Email} email
 * @return {FinancialManager}
 */
export function createFinancialManager(
	fullName: string,
	address: string,
	phone: string,
	email: string
): FinancialManager {
	const fullNameGenitive = inclineFullName(fullName, "genitive");
	const initials = getInitialsFullName(fullName);

	return {
		fullName,
		fullNameGenitive,
		initials,
		address,
		phone,
		email,
	};
}
