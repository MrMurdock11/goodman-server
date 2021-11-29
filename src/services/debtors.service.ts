import { Mapper } from "@automapper/core";
import { find, isNull } from "lodash";

import db, { Database } from "__database__";
import { mapper } from "__mapper__";

import { Debtor } from "@models/debtor";

import { DebtorEntity } from "@routes/debtors/entities/debtor.entity";

export class DebtorsService {
	private readonly _db: Database = db.data as Database;
	private readonly _mapper = mapper;

	public getDebtor(id: string): Debtor {
		const entity = find(this._db.debtors, { id });
		const debtor = this._mapper.map(entity, Debtor, DebtorEntity);

		return debtor;
	}
}
