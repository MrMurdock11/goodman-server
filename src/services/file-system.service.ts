import fs from "fs";
import { injectable } from "inversify";
import { filter, forEach, map, uniq } from "lodash";
import path from "path";

import { Document } from "@models/document";

export interface IFileSystemService {
	saveExportableDocuments(documents: Document[]): void;
}

@injectable()
export class FileSystemService implements IFileSystemService {
	public saveExportableDocuments(documents: Document[]): void {
		const destinationPaths = map(documents, "destinationPath");
		const uniqPaths = uniq(destinationPaths);

		for (const uniqPath of uniqPaths) {
			const requiredDocuments = filter(documents, {
				destinationPath: uniqPath,
			});

			const hasDirectory = fs.existsSync(uniqPath);
			if (hasDirectory) {
				const files = fs.readdirSync(uniqPath);

				forEach(files, file => fs.unlinkSync(path.join(uniqPath, file)));
			} else {
				fs.mkdirSync(uniqPath);
			}

			forEach(requiredDocuments, document =>
				fs.writeFileSync(
					path.join(uniqPath, document.filename),
					document.buffer
				)
			);
		}
	}
}
