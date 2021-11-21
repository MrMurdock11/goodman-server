import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";

import { Debtor } from "@models/debtor";
import { Manager } from "@models/manager";

import { AddDebtorDto } from "@routes/debtors/dtos/add-debtor.dto";
import { DebtorEntity } from "@routes/debtors/entities/debtor.entity";
import { AddManagerDto } from "@routes/managers/dtos/add-manager.dto";
import { ManagerEntity } from "@routes/managers/entities/manager.entity";

export const mapper = createMapper({
	name: "mapper",
	pluginInitializer: classes,
});

mapper.createMap(AddDebtorDto, Debtor);
mapper.createMap(Debtor, DebtorEntity);
mapper.createMap(AddManagerDto, Manager);
mapper.createMap(Manager, ManagerEntity);
