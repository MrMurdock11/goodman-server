import { plainToInstance } from "class-transformer";
import { Router } from "express";

import __mapper from "__mapper__";

import { Courthouse } from "@models/courthouse";

import __container from "@ioc-container/config";
import { services } from "@ioc-container/tokens";

import { ICourthousesService } from "@services/courthouses.service";

import { AddCourthouseDto } from "./add-courthouse.dto";

const router = Router();

router.get("/courthouses", (_, res): void => {});

router.post("/courthouses", async (req, res): Promise<void> => {
	try {
		const courthousesService = __container.get<ICourthousesService>(
			services.COURTHOUSE
		);
		const courthouseDto = plainToInstance(AddCourthouseDto, req.body);
		const courthouse = __mapper.map(
			courthouseDto,
			Courthouse,
			AddCourthouseDto
		);

		await courthousesService.setCourthouse(courthouse);

		res.status(200).send(courthouse);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

router.delete("/courthouses/:id", (req, res) => {});

router.get("/courthouses/:id", (req, res) => {});

export default router;
