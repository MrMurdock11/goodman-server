import { plainToInstance } from "class-transformer";
import { Router } from "express";

import __mapper from "__mapper__";

import { Courthouse } from "@models/courthouse";

import __container from "@ioc-container/config";
import { services } from "@ioc-container/tokens";

import { ICourthousesService } from "@services/courthouses.service";

import { AddCourthouseDto } from "./add-courthouse.dto";

const router = Router();

router.get("/courthouses", (_, res): void => {
	const courthousesService = __container.get<ICourthousesService>(
		services.COURTHOUSES
	);
	const courthouses = courthousesService.getAllCourthouses();

	res.status(200).send(courthouses);
});

router.post("/courthouses", async (req, res): Promise<void> => {
	try {
		const courthousesService = __container.get<ICourthousesService>(
			services.COURTHOUSES
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

router.delete("/courthouses/:id", (req, res) => {
	const { id } = req.params;

	const courthousesService = __container.get<ICourthousesService>(
		services.COURTHOUSES
	);
	courthousesService.deleteCourthouse(id);

	res.status(200).send();
});

router.get("/courthouses/:id", (req, res) => {
	const { id } = req.params;

	const courthousesService = __container.get<ICourthousesService>(
		services.COURTHOUSES
	);
	const courthouse = courthousesService.getCourthouse(id);

	res.status(200).send(courthouse);
});

export default router;
