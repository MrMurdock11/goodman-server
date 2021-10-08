export type CourtOfLaw = {
	title: string;
	address: string;
};

/**
 *
 *
 * @export
 * @param {string} title
 * @param {string} address
 * @return {CourtOfLaw}
 */
export function createCourtOfLaw(title: string, address: string): CourtOfLaw {
	return {
		title,
		address,
	};
}
