import { Container } from "inversify";

import { CompleteProcedureDocumentService } from "@services/complete-procedure-document.service";
import { CourthousesService } from "@services/courthouses.service";
import { DebtorsService } from "@services/debtors.service";
import { DocumentsService } from "@services/documents.service";
import { FileSystemService } from "@services/file-system.service";
import { ManagersService } from "@services/managers.service";
import { PaymentDocumentService } from "@services/payment-document.service";

import { CourthousesRepository } from "../repositories/courthouses.repository";
import { repositories, services } from "./tokens";

const __container = new Container();

// Services
__container.bind(services.DOCUMENTS).to(DocumentsService);
__container.bind(services.DEBTORS).to(DebtorsService);
__container.bind(services.MANAGERS).to(ManagersService);
__container.bind(services.COURTHOUSES).to(CourthousesService);
__container.bind(services.FILE_SYSTEM_SERVICE).to(FileSystemService);
__container.bind(services.PAYMENT_DOCUMENT).to(PaymentDocumentService);
__container
	.bind(services.COMPLETE_PROCEDURE_DOCUMENT)
	.to(CompleteProcedureDocumentService);

// Repositories
__container.bind(repositories.COURTHOUSES).to(CourthousesRepository);

export default __container;
