export class Document {
	constructor(
		public destinationPath: string,
		public filename: string,
		public buffer: NodeJS.ArrayBufferView
	) {}
}
