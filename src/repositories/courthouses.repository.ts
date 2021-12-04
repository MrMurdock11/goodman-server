import { injectable } from "inversify";
import { find, isUndefined, reject } from "lodash";

import db from "__database__";

import { Courthouse } from "@models/courthouse";

import { CourthouseEntity } from "@routes/courthouses/entities/courthouse.entity";

export interface ICourthousesRepository {
	add(courthouse: CourthouseEntity): Promise<void>;

	getAll(): CourthouseEntity[];

	find(id: Uuid): CourthouseEntity | undefined;

	remove(id: Uuid): Promise<void>;
}

@injectable()
export class CourthousesRepository implements ICourthousesRepository {
	private readonly _db = db;

	public async add(courthouse: CourthouseEntity): Promise<void> {
		if (this._db.data === null) {
			throw new Error("Database doesn't exists!");
		}

		this._db.data.courthouses.push(courthouse);
		await this._db.write();
	}

	public getAll(): CourthouseEntity[] {
		if (this._db.data === null) {
			throw new Error("Database doesn't exists!");
		}

		return this._db.data.courthouses;
	}

	public find(id: Uuid): CourthouseEntity | undefined {
		if (this._db.data === null) {
			throw new Error("Database doesn't exists!");
		}

		const courthouse = find(this._db.data.courthouses, { id: id });

		return courthouse;
	}

	public async remove(id: Uuid): Promise<void> {
		if (this._db.data === null) {
			throw new Error("Database doesn't exists!");
		}

		this._db.data.courthouses = reject(this._db.data.courthouses, { id });
		this._db.write();
	}
}
