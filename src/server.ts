import cors from "cors";
import DocxTemplater from "docxtemplater";
import express, { urlencoded, json, Router } from "express";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { split } from "lodash";
import { incline } from "lvovich";
import { DeclentionStrT } from "lvovich/lib/inclineRules";
import moment from "moment";
import path from "path";
import PizZip from "pizzip";

import { CourtOfLaw } from "@domain/court-of-law";
import { Debtor } from "@domain/debtor";
import {
	createFinancialManager,
	FinancialManager,
} from "@domain/financial-manager";

const app = express();
const router = Router();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/api/v1", router);

const inclineFullName = (
	fullName: string,
	declention: DeclentionStrT | undefined
): string => {
	const [last, first, middle] = split(fullName, " ");

	const inclineFullName = incline({ last, first, middle }, declention);

	return `${inclineFullName.last} ${inclineFullName.first} ${inclineFullName.middle}`;
};

router.get("/test", (_, res) => {
	res.send("Hello world!");
});

router.post("/generate", (_, res) => {
	const templatePathForRequestPayment = path.join(
		process.cwd(),
		"/templates/request_payment.docx"
	);
	const templatePathForRequestCompleteProcedure = path.join(
		process.cwd(),
		"/templates/request_complete-procedure.docx"
	);

	for (let i = 0; i < 2; i++) {
		const zip = new PizZip(
			readFileSync(
				i == 0
					? templatePathForRequestPayment
					: templatePathForRequestCompleteProcedure,
				"binary"
			)
		);
		const doc = new DocxTemplater(zip);

		doc.setData({
			id: "А40-20515/2020",
			date: "24.08.2020",
			financialManager: createFinancialManager(
				"Астахов Сергей Михайлович",
				"г. Москва, ул. Пушкина 99",
				"8-966-323-12-01",
				"Ryley_Mayert@example.org"
			),
			debtor: {
				fullName: "Иванов Петр Петрович",
				fullNameGenitive: inclineFullName("Иванов Петр Петрович", "genitive"),
				fullNameInstrumental: inclineFullName(
					"Иванов Петр Петрович",
					"instrumental"
				),
				personalInsurancePolicyNumber: "112-233-125 99", // СНИЛС
				individualTaxpayerNumber: "240852222455", // ИНН
				birthday: "7 мая 1995",
				placeOfBirth: "г. Москва, ул. Ленина 17 к. 1",
				registrationAddress: "г. Москва, ул. Ленина 17 к. 1",
			} as Debtor,
			currentDate: moment().format("DD.MM.YYYY"),
			courtOfLaw: {
				title: "Арбитражного суда г. Москвы",
				address: "г. Москва, ул. Тверская 12",
			} as CourtOfLaw,
		});

		doc.render();

		const buffer = doc.getZip().generate({ type: "nodebuffer" });

		const outputDirectory = path.join(process.cwd(), "output");

		if (!existsSync(outputDirectory)) {
			mkdirSync(path.join(process.cwd(), "output"));
		}

		writeFileSync(
			path.join(
				process.cwd(),
				i == 0
					? "output/request_payment.docx"
					: "output/request_complete-procedure.docx"
			),
			buffer
		);
	}

	res.status(200).send();
});

export default app;
