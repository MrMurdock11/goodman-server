import { split } from "lodash";
import { incline } from "lvovich";
import { DeclentionStrT } from "lvovich/lib/inclineRules";

export const inclineFullName = (
	fullName: string,
	declention: DeclentionStrT | undefined
): string => {
	const [last, first, middle] = split(fullName, " ");

	const inclineFullName = incline({ last, first, middle }, declention);

	return `${inclineFullName.last} ${inclineFullName.first} ${inclineFullName.middle}`;
};
