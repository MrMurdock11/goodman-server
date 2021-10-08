import { DebtorDto } from "./debtor.dto";
import { FinancialManagerDto } from "./financial-manager.dto";

export type RequestPaymentDto = {
	debtorFullName: DebtorDto;

	financialManager: FinancialManagerDto;

	currentDate: string;
};
