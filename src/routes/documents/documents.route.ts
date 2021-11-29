import { Router } from "express";
import fs from "fs";
import path from "path";

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

export default router;
