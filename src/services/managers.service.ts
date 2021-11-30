import { injectable } from "inversify";
import { find } from "lodash";

import db, { Database } from "__database__";
import __mapper from "__mapper__";

import { Manager } from "@models/manager";

import { ManagerEntity } from "@routes/managers/entities/manager.entity";

export interface IManagersService {
	getManager(id: string): Manager;
}

@injectable()
export class ManagersService implements IManagersService {
	private readonly _db: Database = db.data as Database;
	private readonly _mapper = __mapper;

	public getManager(id: string): Manager {
		const entity = find(this._db.managers, { id });
		const debtor = this._mapper.map(entity, Manager, ManagerEntity);

		return debtor;
	}
}
