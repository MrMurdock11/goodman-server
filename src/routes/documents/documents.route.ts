import { Router } from "express";
import fs from "fs";
import { find, isNull } from "lodash";
import path from "path";
import PizZip from "pizzip";
import db from "__database__";
import { GenerateDto } from "./dtos/generate.dto";
import DocxTemplater from "docxtemplater";
import { Manager } from "@models/manager";
import { Debtor } from "@models/debtor";
import moment from "moment";
import { mapper } from "__mapper__";
import { ManagerEntity } from "@routes/managers/entities/manager.entity";
import { DebtorEntity } from "@routes/debtors/entities/debtor.entity";

type Template = {
	basename: string;
	extension: string;
	displayName: string;
}

const router = Router();
const documentsPath = path.join(process.cwd(), ".data/exports");
const templatesPath = path.join(process.cwd(), "templates");
const templates: Template[] = [{basename: "request_payment", extension: ".docx", displayName: "Запрос Баланса"}, {basename: "request_complete-procedure", extension: ".docx", displayName: "Запрос на завершение процесса."}];

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
	const {managerId, debtorId, courthouseId} = <GenerateDto>req.body;

	if (isNull(db.data)) {
		res.status(500).send();
		return void 0;
	}

	const managerEntity = find(db.data.managers, {id: managerId});
	const manager = mapper.map(managerEntity, Manager, ManagerEntity);
	const debtorEntity = find(db.data.debtors, {id: debtorId});
	const debtor = mapper.map(debtorEntity, Debtor, DebtorEntity);

	for (const template of templates) {
		generate(template, manager, debtor);
	}

	res.status(200).send();
});

const generate = (template: Template, manager: Manager, debtor: Debtor): void => {
	const {basename, extension, displayName} = template;
	const debtorDocumentsPath = path.join(documentsPath, debtor.id);
	const filename = path.format({name: basename, ext: extension});
	const fullPathToTemplate = path.join(templatesPath, filename);
		const zip = new PizZip(
			fs.readFileSync(
				fullPathToTemplate,
				"binary"
			)
		);
		const templateEngine = new DocxTemplater(zip);

		templateEngine.setData({
			id: "А40-20515/2020",
			date: "24.08.2020",
			financialManager: manager,
			debtor: debtor,
			currentDate: moment().format("DD.MM.YYYY"),
			// courtOfLaw: undefined,
		});

		templateEngine.render();

		const buffer = templateEngine.getZip().generate({ type: "nodebuffer" });

		if (!fs.existsSync(debtorDocumentsPath)) {
			fs.mkdirSync(debtorDocumentsPath);
		}

		fs.writeFileSync(
			path.join(debtorDocumentsPath, path.format({
				name: displayName,
				ext: extension
			})),
			buffer
		);
}

export default router;
