import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Folder } from "../dashboard/models/folder.model";


@Injectable({providedIn: 'root' })

export class AudiostoreService {

    folders: Folder[] = [];

    constructor(private http: HttpClient) {

    }
    SERVER_URL = environment.serverUrl;

    fetchFolder(folderName: string) {
        return this.http.get<Folder>(this.SERVER_URL + '/audiostore/fetchfolder?name=' + folderName).pipe(take(1));
    }

    fetchFolders() {
        return this.http.get<Folder[]>(this.SERVER_URL + '/audiostore/fetchfolders').pipe(
            take(1),
            tap(folders => {
                this.folders = folders;
            }));
    }

    createFolder(folderName: string) {
        return this.http.post<Folder>(this.SERVER_URL + '/audiostore/createfolder', {folderName: folderName}).pipe(take(1));
    }

    uploadAudio(folderToUpload: any) {

        let formData = new FormData();

        formData.append('folderName', folderToUpload.folderName);
        formData.append('trackName', folderToUpload.file.name);
        formData.append('track', folderToUpload.file);



        return this.http.post<any>(this.SERVER_URL + '/audio/upload/mp3', formData);

      

    }

    uploadFolderData(folderData: any) {
        let formData = new FormData();
        console.log(folderData.metaData);

        formData.append('folderName', folderData.folderName);
        formData.append('bookName', folderData.metaData.bookName);
        formData.append('author', folderData.metaData.author);
        formData.append('description', folderData.metaData.description);

        formData.append('images', folderData.images.faceImage);
        formData.append('images', folderData.images.backImage);

        return this.http.post<any>(this.SERVER_URL + '/audiostore/upload/data', formData).pipe(take(1));
    }

}