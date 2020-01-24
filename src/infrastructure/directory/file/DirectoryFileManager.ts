import {FileManager} from "../../../domain/file/FileManager";

export class DirectoryFileManager implements FileManager {
    private fileSystem = require("fs");
    private pathUtils = require("path");

    read(directory: string, file: string): string {
        return this.fileSystem.readFileSync(this.pathUtils.join(directory, file), {encoding: 'utf-8'});
    }
}
