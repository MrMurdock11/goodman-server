import { plainToInstance } from "class-transformer";
import { Router } from "express";
import { filter, find, isNull, reject } from "lodash";

import db from "__database__";
import { mapper } from "__mapper__";

import { Debtor } from "@models/debtor";

import { DebtorsService } from "@services/debtors.service";

import { AddDebtorDto } from "./dtos/add-debtor.dto";
import { DebtorEntity } from "./entities/debtor.entity";

const router = Router();

router.get("/debtors", (_, res): void => {
	res.send(db.data?.debtors);
});

router.post("/debtors", async (req, res): Promise<void> => {
	const dto: AddDebtorDto = plainToInstance(AddDebtorDto, req.body);
	const debtor = mapper.map(dto, Debtor, AddDebtorDto);
	const entity = mapper.map(debtor, DebtorEntity, Debtor);

	db.data?.debtors.push(entity);

	await db.write();

	res.status(200).send();
});

router.delete("/debtors/:id", (req, res) => {
	const { id } = req.params;

	if (isNull(db.data)) {
		res.status(500).send();
		return void 0;
	}

	db.data.debtors = reject(db.data.debtors, { id });
	db.write();

	res.status(200).send();
});

router.get("/debtors/:id", (req, res) => {
	const { id } = req.params;
	const debtorsService = new DebtorsService();

	const debtor = debtorsService.getDebtor(id);

	res.status(200).send(debtor);
});

export default router;
