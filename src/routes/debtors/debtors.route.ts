import { plainToInstance } from "class-transformer";
import { Router } from "express";

import db from "__database__";
import { mapper } from "__mapper__";

import { Debtor } from "@models/debtor";

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

export default router;
