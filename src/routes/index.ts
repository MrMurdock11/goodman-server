import courthouses from "./courthouses/courthouses.route";
import debtors from "./debtors/debtors.route";
import documents from "./documents/documents.route";
import managers from "./managers/managers.route";

const routes = [managers, debtors, documents, courthouses];

export { routes };
