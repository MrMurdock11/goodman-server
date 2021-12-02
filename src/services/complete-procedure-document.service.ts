import DocxTemplateEngine from "docxtemplater";
import fs from "fs";
import { injectable } from "inversify";
import { upperFirst } from "lodash";
import moment from "moment";
import path from "path";
import PizZip from "pizzip";

import { Courthouse } from "@models/courthouse";
import { Debtor } from "@models/debtor";
import { Document } from "@models/document";
import { Manager } from "@models/manager";

import { getInitialsFullName } from "@helper/get-initials-full-name.helper";
import { inclineFullName } from "@helper/incline-full-name.helper";

import { GetInclinePhraseGenitiveClient } from "../clients/clients";

export interface ICompleteProcedureDocumentService {
	generate(
		manager: Manager,
		debtor: Debtor,
		courthouse: Courthouse
	): Promise<Document>;
}

@injectable()
export class CompleteProcedureDocumentService
	implements ICompleteProcedureDocumentService
{
	private readonly _templateFilePath = path.join(
		process.cwd(),
		"templates/complete-procedure.docx"
	);
	private readonly _exportsPath = path.join(process.cwd(), ".data/exports");
	private readonly _resultFilename =
		"Ходатайство о завершении процедуры реализации имущества гражданина.docx";

	public async generate(
		manager: Manager,
		debtor: Debtor,
		courthouse: Courthouse
	): Promise<Document> {
		const destinationPath = path.join(this._exportsPath, debtor.id);
		const client = new GetInclinePhraseGenitiveClient();

		const zip = new PizZip(fs.readFileSync(this._templateFilePath, "binary"));
		const docxTemplateEngine = new DocxTemplateEngine(zip);
		const courthouseTitleGenitiveInclineForm = await client.get(
			courthouse.title
		);

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
			courthouse: {
				...courthouse,
				titleGenitive: upperFirst(courthouseTitleGenitiveInclineForm),
			},
		});

		docxTemplateEngine.render();

		const buffer = docxTemplateEngine.getZip().generate({ type: "nodebuffer" });
		const document = new Document(
			destinationPath,
			this._resultFilename,
			buffer
		);

		return document;
	}
}
