import { injectable } from "inversify";
import { find, isUndefined } from "lodash";

import db from "__database__";

import { CourthouseEntity } from "@routes/courthouses/entities/courthouse.entity";

export interface ICourthousesRepository {
	add(courthouse: CourthouseEntity): Promise<void>;

	find(id: Uuid): CourthouseEntity | undefined;
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

	public find(id: Uuid): CourthouseEntity | undefined {
		if (this._db.data === null) {
			throw new Error("Database doesn't exists!");
		}

		const courthouse = find(this._db.data.courthouses, { id: id });

		return courthouse;
	}
}
