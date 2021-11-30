import { AutoMap } from "@automapper/classes";

export class AddCourthouseDto {
	@AutoMap()
	public title: string = "";

	@AutoMap()
	public address: string = "";
}
