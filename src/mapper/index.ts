import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";

import { Courthouse } from "@models/courthouse";
import { Debtor } from "@models/debtor";
import { Manager } from "@models/manager";

import { AddCourthouseDto } from "@routes/courthouses/add-courthouse.dto";
import { CourthouseEntity } from "@routes/courthouses/entities/courthouse.entity";
import { AddDebtorDto } from "@routes/debtors/dtos/add-debtor.dto";
import { DebtorEntity } from "@routes/debtors/entities/debtor.entity";
import { AddManagerDto } from "@routes/managers/dtos/add-manager.dto";
import { ManagerEntity } from "@routes/managers/entities/manager.entity";

const __mapper = createMapper({
	name: "mapper",
	pluginInitializer: classes,
});

__mapper.createMap(AddDebtorDto, Debtor);
__mapper.createMap(Debtor, DebtorEntity);
__mapper.createMap(DebtorEntity, Debtor); // reverse

__mapper.createMap(AddManagerDto, Manager);
__mapper.createMap(Manager, ManagerEntity);
__mapper.createMap(ManagerEntity, Manager); // reverse

__mapper.createMap(AddCourthouseDto, Courthouse);
__mapper.createMap(Courthouse, CourthouseEntity);
__mapper.createMap(CourthouseEntity, Courthouse); // reverse

export default __mapper;
