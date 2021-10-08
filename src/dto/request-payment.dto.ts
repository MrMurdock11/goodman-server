import { Debtor } from "../domain/debtor";
import { FinancialManager } from "../domain/financial-manager";

export type RequestPaymentDto = {
	debtor: Debtor;
	financialManager: FinancialManager;
	currentDate: string;
};
