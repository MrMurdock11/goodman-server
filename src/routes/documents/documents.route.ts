import { Router } from "express";
import fs from "fs";
import path from "path";

import { DebtorsService } from "@services/debtors.service";
import { DocumentsService } from "@services/documents.service";
import { ManagersService } from "@services/managers.service";

import { GenerateDto } from "./dtos/generate.dto";

const router = Router();
const documentsPath = path.join(process.cwd(), ".data/exports");

router.get("/documents/:debtorId", (req, res) => {
	const { debtorId } = req.params;
	const debtorDocumentsPath = path.join(documentsPath, debtorId);
	const isExists = fs.existsSync(debtorDocumentsPath);

	if (!isExists) {
		res.status(500).send();
		return void 0;
	}

	const fileNames = fs.readdirSync(debtorDocumentsPath);

	res.status(200).send(fileNames);
});

router.post("/documents/generate", (req, res) => {
	const { managerId, debtorId, courthouseId }: GenerateDto = req.body;

	try {
		const managersService = new ManagersService();
		const debtorsService = new DebtorsService();
		const documentsService = new DocumentsService();

		const debtor = debtorsService.getDebtor(debtorId);
		const manager = managersService.getManager(managerId);

		documentsService.generateRequestPayment(manager, debtor);
	} catch (error) {
		console.log(error);
	}

	res.status(200).send();
});

export default router;
