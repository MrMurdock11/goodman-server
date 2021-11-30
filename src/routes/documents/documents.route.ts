import { Router } from "express";
import fs from "fs";
import path from "path";

import __container from "@ioc-container/config";
import { services } from "@ioc-container/tokens";

import { IDocumentsService } from "@services/documents.service";

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
	const { managerId, debtorId, courthouseId } = req.body as GenerateDto;

	try {
		const documentsService = __container.get<IDocumentsService>(
			services.DOCUMENTS
		);

		documentsService.generateRequestPayment(managerId, debtorId);
	} catch (error) {
		console.log(error);
	}

	res.status(200).send();
});

export default router;
