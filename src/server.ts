import express, { urlencoded, json, Router } from "express";
import cors from "cors";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import { FinancialManagerDto } from "./models/financial-manager.dto";
import { DebtorDto } from "./models/debtor.dto";
import moment from "moment";
import { CourtOfLawDto } from "./models/court-of-law.dto";
import { incline } from "lvovich";
import { DeclentionStrT } from "lvovich/lib/inclineRules";
import { split } from "lodash";

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
			financialManager: {
				fullName: "Астахов Сергей Михайлович",
				fullNameGenitive: inclineFullName(
					"Астахов Сергей Михайлович",
					"genitive"
				),
				initials: "Астахов С.М.",
				address: "г. Москва, ул. Пушкина 99",
				phone: "8-966-323-12-01",
				email: "Ryley_Mayert@example.org",
			} as FinancialManagerDto,
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
			} as DebtorDto,
			currentDate: moment().format("DD.MM.YYYY"),
			courtOfLaw: {
				title: "Арбитражного суда г. Москвы",
				address: "г. Москва, ул. Тверская 12",
			} as CourtOfLawDto,
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
