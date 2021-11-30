import { AutoMap } from "@automapper/classes";
import { v4 } from "uuid";

export class Courthouse {
	public id: Uuid = v4();

	@AutoMap()
	public title: string = "";

	@AutoMap()
	public address: string = "";
}
