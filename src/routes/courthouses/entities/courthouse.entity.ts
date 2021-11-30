import { AutoMap } from "@automapper/classes";

export class CourthouseEntity {
	public id = "";

	@AutoMap()
	public title = "";

	@AutoMap()
	public address = "";
}
