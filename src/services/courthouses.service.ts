import { inject, injectable } from "inversify";
import { ICourthousesRepository } from "repositories/courthouses.repository";

import __mapper from "__mapper__";

import { Courthouse } from "@models/courthouse";

import { repositories } from "@ioc-container/tokens";

import { CourthouseEntity } from "@routes/courthouses/entities/courthouse.entity";

export interface ICourthousesService {
	getAllCourthouses(): Courthouse[];

	getCourthouse(id: string): Courthouse;

	setCourthouse(courthouse: Courthouse): Promise<void>;
	deleteCourthouse(id: string): void;
}

@injectable()
export class CourthousesService implements ICourthousesService {
	@inject(repositories.COURTHOUSES)
	private readonly courthouseRepository!: ICourthousesRepository;
	private readonly _mapper = __mapper;

	getAllCourthouses(): Courthouse[] {
		throw new Error("Method not implemented.");
	}

	getCourthouse(id: string): Courthouse {
		const courthouseEntity = this.courthouseRepository.find(id);
		const courthouse = this._mapper.map(
			courthouseEntity,
			CourthouseEntity,
			Courthouse
		);

		return courthouse;
	}

	public async setCourthouse(courthouse: Courthouse): Promise<void> {
		const courthouseEntity = this._mapper.map(
			courthouse,
			CourthouseEntity,
			Courthouse
		);
		await this.courthouseRepository.add(courthouseEntity);
	}

	deleteCourthouse(id: string): void {
		throw new Error("Method not implemented.");
	}
}
