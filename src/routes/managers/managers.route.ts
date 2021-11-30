import { plainToInstance } from "class-transformer";
import { Router } from "express";
import { reject, find, isNull } from "lodash";

import db from "__database__";
import __mapper from "__mapper__";

import { Manager } from "@models/manager";

import { AddManagerDto } from "./dtos/add-manager.dto";
import { ManagerEntity } from "./entities/manager.entity";

const router = Router();

router.get("/managers", (_, res): void => {
	res.send(db.data?.managers);
});

router.post("/managers", async (req, res): Promise<void> => {
	const dto: AddManagerDto = plainToInstance(AddManagerDto, req.body);
	const debtor = __mapper.map(dto, Manager, AddManagerDto);
	const entity = __mapper.map(debtor, ManagerEntity, Manager);

	db.data?.managers.push(entity);

	await db.write();

	res.status(200).send();
});

router.delete("/managers/:id", (req, res) => {
	const { id } = req.params;

	if (isNull(db.data)) {
		res.status(500).send();
		return void 0;
	}

	db.data.managers = reject(db.data.managers, { id });
	db.write();

	res.status(200).send();
});

router.get("/managers/:id", (req, res) => {
	const { id } = req.params;

	if (isNull(db.data)) {
		res.status(500).send();
		return void 0;
	}

	const foundDebtor = find(db.data.managers, { id });

	res.status(200).send(foundDebtor);
});

export default router;
