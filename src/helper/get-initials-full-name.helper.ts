import { split, upperCase, upperFirst, first } from "lodash";

export const getInitialsFullName = (fullName: string) => {
	const [lastName, firstName, middleName] = split(fullName, " ");

	return `${upperFirst(lastName)} ${upperCase(first(firstName))}.${upperCase(
		first(middleName)
	)}.`;
};
