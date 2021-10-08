import { Debtor } from "../domain/debtor";
import { FinancialManager } from "../domain/financial-manager";

export type RequestPaymentDto = {
	debtorFullName: Debtor;

	financialManager: FinancialManager;

	currentDate: string;
};
