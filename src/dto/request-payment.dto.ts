import { TDebtor } from "@models/debtor";
import { FinancialManager } from "@models/manager";

export type RequestPaymentDto = {
	debtor: TDebtor;
	financialManager: FinancialManager;
	currentDate: string;
};
