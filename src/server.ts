import cors from "cors";
import DocxTemplater from "docxtemplater";
import express, { urlencoded, json, Router } from "express";
import fs from "fs";
import moment from "moment";
import path from "path";
import PizZip from "pizzip";

import { createCourtOfLaw } from "@models/court-of-law";

import { routes } from "./routes/index";

const app = express();
const router = Router();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/api/v1", routes);

const cwd = process.cwd();

// router.post("/generate", (_, res) => {
// 	const templatePathForRequestPayment = path.join(
// 		process.cwd(),
// 		"/templates/request_payment.docx"
// 	);
// 	const templatePathForRequestCompleteProcedure = path.join(
// 		process.cwd(),
// 		"/templates/request_complete-procedure.docx"
// 	);

// 	for (let i = 0; i < 2; i++) {
// 		const zip = new PizZip(
// 			fs.readFileSync(
// 				i == 0
// 					? templatePathForRequestPayment
// 					: templatePathForRequestCompleteProcedure,
// 				"binary"
// 			)
// 		);
// 		const doc = new DocxTemplater(zip);

// 		doc.setData({
// 			id: "А40-20515/2020",
// 			date: "24.08.2020",
// 			financialManager: createFinancialManager(
// 				"Астахов Сергей Михайлович",
// 				"г. Москва, ул. Пушкина 99",
// 				"8-966-323-12-01",
// 				"Ryley_Mayert@example.org"
// 			),
// 			debtor: createDebtor(
// 				"Иванов Петр Петрович",
// 				"112-233-125 99",
// 				"240852222455",
// 				"7 мая 1995",
// 				"г. Москва, ул. Ленина 17 к. 1",
// 				"г. Москва, ул. Ленина 17 к. 1"
// 			),
// 			currentDate: moment().format("DD.MM.YYYY"),
// 			courtOfLaw: createCourtOfLaw(
// 				"Арбитражного суда г. Москвы",
// 				"г. Москва, ул. Тверская 12"
// 			),
// 		});

// 		doc.render();

// 		const buffer = doc.getZip().generate({ type: "nodebuffer" });

// 		const documentsPath = path.join(cwd, "documents");

// 		if (!fs.existsSync(documentsPath)) {
// 			fs.mkdirSync(path.join(cwd, "documents"));
// 		}

// 		fs.writeFileSync(
// 			path.join(
// 				process.cwd(),
// 				i == 0
// 					? "documents/request_payment.docx"
// 					: "documents/request_complete-procedure.docx"
// 			),
// 			buffer
// 		);
// 	}

// 	res.status(200).send();
// });

// router.get("/documents", (_, res) => {
// 	const documentsPath = path.join(cwd, "/documents");
// 	const entries = fs.readdirSync(documentsPath);
// });

export default app;
