import DocxTemplateEngine from "docxtemplater";
import fs from "fs";
import { injectable } from "inversify";
import moment from "moment";
import path from "path";
import PizZip from "pizzip";

import { Courthouse } from "@models/courthouse";
import { Debtor } from "@models/debtor";
import { Manager } from "@models/manager";

import { getInitialsFullName } from "@helper/get-initials-full-name.helper";
import { inclineFullName } from "@helper/incline-full-name.helper";

export interface IRequestPaymentDocumentService {
	generate(manager: Manager, debtor: Debtor, courthouse: Courthouse): void;
}

@injectable()
export class RequestPaymentDocumentService
	implements IRequestPaymentDocumentService
{
	private readonly _templateFilePath = path.join(
		process.cwd(),
		"templates/request-payment.docx"
	);

	private readonly _exportsPath = path.join(process.cwd(), ".data/exports");
	private readonly _resultFileName =
		"Ходатайство о завершении процедуры реализации имущества гражданина.docx";

	public generate(
		manager: Manager,
		debtor: Debtor,
		courthouse: Courthouse
	): void {
		const destinationPath = path.join(this._exportsPath, debtor.id);

		const files = fs.readdirSync(destinationPath);
		if (files.length > 0) {
			for (const file of files) {
				fs.unlinkSync(path.join(destinationPath, file));
			}
		}

		const zip = new PizZip(fs.readFileSync(this._templateFilePath, "binary"));
		const docxTemplateEngine = new DocxTemplateEngine(zip);

		docxTemplateEngine.setData({
			id: "А40-20515/2020",
			date: "24.08.2020",
			currentDate: moment().format("DD.MM.YYYY"),
			financialManager: {
				// create template model
				...manager,
				fullNameGenitive: inclineFullName(manager.fullName, "genitive"),
				initials: getInitialsFullName(manager.fullName),
			},
			debtor: {
				...debtor,
				fullNameGenitive: inclineFullName(debtor.fullName, "genitive"),
				fullNameInstrumental: inclineFullName(debtor.fullName, "instrumental"),
			},
			courthouse,
		});

		docxTemplateEngine.render();

		const buffer = docxTemplateEngine.getZip().generate({ type: "nodebuffer" });

		if (!fs.existsSync(destinationPath)) {
			fs.mkdirSync(destinationPath);
		}

		fs.writeFileSync(path.join(destinationPath, this._resultFileName), buffer);
	}
}
