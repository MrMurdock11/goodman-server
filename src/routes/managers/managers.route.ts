import { plainToInstance } from "class-transformer";
import { Router } from "express";

import db from "__database__";
import { mapper } from "__mapper__";

import { Manager } from "@models/manager";

import { AddManagerDto } from "./dtos/add-manager.dto";
import { ManagerEntity } from "./entities/manager.entity";

const router = Router();

router.get("/managers", (_, res): void => {
	res.send(db.data?.managers);
});

router.post("/managers", async (req, res): Promise<void> => {
	const dto: AddManagerDto = plainToInstance(AddManagerDto, req.body);
	const debtor = mapper.map(dto, Manager, AddManagerDto);
	const entity = mapper.map(debtor, ManagerEntity, Manager);

	db.data?.managers.push(entity);

	await db.write();

	res.status(200).send();
});

export default router;
