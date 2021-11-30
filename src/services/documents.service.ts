import DocxTemplateEngine from "docxtemplater";
import { inject, injectable } from "inversify";

import { Debtor } from "@models/debtor";

import { services } from "@ioc-container/tokens";

import { inclineFullName } from "@helper/incline-full-name.helper";

import { IDebtorService } from "./debtors.service";
import { IManagersService } from "./managers.service";
import { IRequestPaymentDocumentService } from "./request-payment-document.service";

export interface IDocumentsService {
	generateRequestPayment(managerId: string, debtorId: string): void;
}

@injectable()
export class DocumentsService implements IDocumentsService {
	@inject(services.REQUEST_PAYMENT_DOCUMENT)
	private readonly _requestPaymentDocumentService!: IRequestPaymentDocumentService;

	@inject(services.MANAGERS)
	private readonly _managersService!: IManagersService;

	@inject(services.DEBTORS)
	private readonly _debtorsService!: IDebtorService;

	public generateRequestPayment(managerId: string, debtorId: string): void {
		const manager = this._managersService.getManager(managerId);
		const debtor = this._debtorsService.getDebtor(debtorId);

		this._requestPaymentDocumentService.generate(manager, debtor);
	}
}
