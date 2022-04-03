import { File } from "./file.model";

export class Folder {
    constructor(
        public folderName: string,
        public files: [File],
        public faceImage?: File,
        public backImage?: File,
        public bookName?: string,
        public author?: string,
        public description?: string
    ){

    }
}