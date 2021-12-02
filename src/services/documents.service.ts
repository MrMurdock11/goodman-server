import { inject, injectable } from "inversify";

import { services } from "@ioc-container/tokens";

import { ICourthousesService } from "./courthouses.service";
import { IDebtorService } from "./debtors.service";
import { IManagersService } from "./managers.service";
import { IRequestPaymentDocumentService } from "./request-payment-document.service";

export interface IDocumentsService {
	generate(managerId: Uuid, debtorId: Uuid, courthouseId: Uuid): void;
}

@injectable()
export class DocumentsService implements IDocumentsService {
	@inject(services.REQUEST_PAYMENT_DOCUMENT)
	private readonly _requestPaymentDocumentService!: IRequestPaymentDocumentService;

	@inject(services.MANAGERS)
	private readonly _managersService!: IManagersService;

	@inject(services.DEBTORS)
	private readonly _debtorsService!: IDebtorService;

	@inject(services.COURTHOUSES)
	private readonly _courthousesService!: ICourthousesService;

	public async generate(
		managerId: Uuid,
		debtorId: Uuid,
		courthouseId: Uuid
	): Promise<void> {
		const manager = this._managersService.getManager(managerId);
		const debtor = this._debtorsService.getDebtor(debtorId);
		const courthouse = this._courthousesService.getCourthouse(courthouseId);

		await this._requestPaymentDocumentService.generate(
			manager,
			debtor,
			courthouse
		);
	}
}
