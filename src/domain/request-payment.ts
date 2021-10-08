import { Debtor } from "./debtor";
import { FinancialManager } from "./financial-manager";

export type RequestPayment = {
	debtorFullName: Debtor;

	financialManager: FinancialManager;

	currentDate: string;
};
