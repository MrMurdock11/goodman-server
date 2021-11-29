import { instanceToPlain } from "class-transformer";
import DocxTemplateEngine from "docxtemplater";
import fs from "fs";
import { find, isNull } from "lodash";
import moment from "moment";
import path from "path";
import PizZip from "pizzip";

import { Debtor } from "@models/debtor";
import { Manager } from "@models/manager";

import { getInitialsFullName } from "@helper/get-initials-full-name.helper";
import { inclineFullName } from "@helper/incline-full-name.helper";

export type TemplateInfo = {
	basename: string;
	extension: string;
	displayName: string;
};
const templates: TemplateInfo[] = [
	{
		basename: "request_payment",
		extension: ".docx",
		displayName: "Запрос Баланса",
	},
	{
		basename: "request_complete-procedure",
		extension: ".docx",
		displayName: "Запрос на завершение процесса.",
	},
];

export class DocumentsService {
	private readonly _dataPath = path.join(process.cwd(), ".data/exports");
	private readonly _templatesPath = path.join(process.cwd(), "templates");

	public generateRequestPayment(manager: Manager, debtor: Debtor): void {
		const { basename, extension, displayName } = templates[0];
		const debtorDocumentsPath = path.join(this._dataPath, debtor.id);
		const filename = path.format({ name: basename, ext: extension });
		const fullPathToTemplate = path.join(this._templatesPath, filename);
		const zip = new PizZip(fs.readFileSync(fullPathToTemplate, "binary"));
		const docxTemplateEngine = new DocxTemplateEngine(zip);

		this.setManagerInfo(docxTemplateEngine, manager);
		// this.setDebtorInfo(docxTemplateEngine, debtor);

		// docxTemplateEngine.setData({
		// 	id: "А40-20515/2020",
		// 	date: "24.08.2020",
		// 	currentDate: moment().format("DD.MM.YYYY"),
		//	courtOfLaw: undefined,
		// });

		docxTemplateEngine.render();

		const buffer = docxTemplateEngine.getZip().generate({ type: "nodebuffer" });

		if (!fs.existsSync(debtorDocumentsPath)) {
			fs.mkdirSync(debtorDocumentsPath);
		}

		fs.writeFileSync(
			path.join(
				debtorDocumentsPath,
				path.format({
					name: displayName,
					ext: extension,
				})
			),
			buffer
		);
	}

	private setManagerInfo(engine: DocxTemplateEngine, manager: Manager): void {
		engine.setData({
			...instanceToPlain(manager),
			fullNameGenitive: inclineFullName(manager.fullName, "genitive"),
			initials: getInitialsFullName(manager.fullName),
		});
	}

	private setDebtorInfo(engine: DocxTemplateEngine, debtor: Debtor): void {
		engine.setData({
			...debtor,
			fullNameGenitive: inclineFullName(debtor.fullName, "genitive"),
			fullNameInstrumental: inclineFullName(debtor.fullName, "instrumental"),
		});
	}
}
