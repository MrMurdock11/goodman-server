import { Container } from "inversify";

import { CourthousesService } from "@services/courthouses.service";
import { DebtorsService } from "@services/debtors.service";
import { DocumentsService } from "@services/documents.service";
import { ManagersService } from "@services/managers.service";
import { RequestPaymentDocumentService } from "@services/request-payment-document.service";

import { CourthousesRepository } from "../repositories/courthouses.repository";
import { repositories, services } from "./tokens";

const __container = new Container();

// Services
__container.bind(services.DOCUMENTS).to(DocumentsService);
__container.bind(services.DEBTORS).to(DebtorsService);
__container.bind(services.MANAGERS).to(ManagersService);
__container.bind(services.COURTHOUSES).to(CourthousesService);
__container
	.bind(services.REQUEST_PAYMENT_DOCUMENT)
	.to(RequestPaymentDocumentService);

// Repositories
__container.bind(repositories.COURTHOUSES).to(CourthousesRepository);

export default __container;
