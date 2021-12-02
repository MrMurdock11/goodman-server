import { inject, injectable } from "inversify";

import { services } from "@ioc-container/tokens";

import { ICompleteProcedureDocumentService } from "./complete-procedure-document.service";
import { ICourthousesService } from "./courthouses.service";
import { IDebtorService } from "./debtors.service";
import { IFileSystemService } from "./file-system.service";
import { IManagersService } from "./managers.service";
import { IPaymentDocumentService } from "./payment-document.service";

export interface IDocumentsService {
	generate(managerId: Uuid, debtorId: Uuid, courthouseId: Uuid): void;
}

@injectable()
export class DocumentsService implements IDocumentsService {
	@inject(services.PAYMENT_DOCUMENT)
	private readonly _paymentDocumentService!: IPaymentDocumentService;

	@inject(services.COMPLETE_PROCEDURE_DOCUMENT)
	private readonly _completeProcedureDocumentService!: ICompleteProcedureDocumentService;

	@inject(services.FILE_SYSTEM_SERVICE)
	private readonly _fileSystemService!: IFileSystemService;

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

		const paymentDocument = await this._paymentDocumentService.generate(
			manager,
			debtor,
			courthouse
		);
		const completeProcedureDocument =
			await this._completeProcedureDocumentService.generate(
				manager,
				debtor,
				courthouse
			);

		this._fileSystemService.saveExportableDocuments([
			paymentDocument,
			completeProcedureDocument,
		]);
	}
}
