import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Folder } from "src/app/dashboard/models/folder.model";
import { PlaylistService } from "src/app/dashboard/playlist/playlist.service";
import { AudiostoreService } from 'src/app/audiostore/audiostore.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";



@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit, OnDestroy {




    constructor(private audiostoreService: AudiostoreService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    folder!: Folder;
    folderToUpload: any | null = null;

    sub!: Subscription;

    @ViewChild('inputField', { static: true }) input!: ElementRef;


    ngOnInit() {
        this.sub = this.route.params.subscribe(folderName => {
            if (!folderName) return;

            const folder = folderName['name'];

            this.audiostoreService.fetchFolder(folder).subscribe(folderDoc => {
                if (folderDoc === null) return;
                console.log(folderDoc);

                this.folder = folderDoc;
                this.updateContent(folderDoc);

            })
        })
    }





    editForm = new FormGroup({
        faceImage: new FormControl(null, Validators.required),
        backImage: new FormControl(null),
        name: new FormControl(null, Validators.required),
        author: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required)

    });

    onCreateFolder() {
        const newFolder = this.input.nativeElement.value;
        if (newFolder === '' || this.folder) {
            return;
        }

        this.audiostoreService.createFolder(newFolder).subscribe(folderData => {
            console.log('created');
            const folderName = folderData.folderName;
            this.router.navigate(['audiostore/edit', folderName]);
        });
    }


    onSendAudio() {
        this.audiostoreService.uploadAudio(this.folderToUpload).subscribe(() => {
            
            this.update();
        });
    }

    onSubmit() {
        if (!this.editForm.valid) {
            return;
        }
        const dataToUpload = this.dataToUploadHandler();
        console.log(dataToUpload);
        this.audiostoreService.uploadFolderData(dataToUpload).subscribe(() => {
            console.log('done');
            this.update();
            this.router.navigate(['/audiostore']);
        });
    }



    private dataToUploadHandler() {
        const folderName = this.folder.folderName;
        const faceImage = this.editForm.value.faceImage;
        const backImage = this.editForm.value.backImage;
        const bookName = this.editForm.value.name;
        const author = this.editForm.value.author;
        const description = this.editForm.value.description;

        const folder = {
            folderName: folderName,

            metaData: {
                bookName: bookName,
                author: author,
                description: description
            },

            
            images: {
                faceImage: faceImage,
                backImage: backImage
            }
            
        }

        return folder;
    }

    onSelectFile(event: any) {
        const file: File = event.target.files[0];
        const folderName = this.folder.folderName;

        if (file !== null) {
            const folder = { folderName: folderName, file: file };
            this.folderToUpload = folder;
        }
    }

    onSelectFaceImage(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.editForm.patchValue({
                faceImage: file
            });
        }
    }

    onSelectBackImage(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.editForm.patchValue({
                backImage: file
            });
        }
    }

    private updateContent(folderData: Folder) {
        console.log(folderData);
        this.editForm.patchValue({faceImage: folderData.faceImage});
        this.editForm.patchValue({backImage: folderData.backImage});
        this.editForm.patchValue({name: folderData.bookName});
        this.editForm.patchValue({author: folderData.author});
        this.editForm.patchValue({description: folderData.description});

       
    }

    private update() {
        const folder = this.folder.folderName;
        this.audiostoreService.fetchFolder(folder).subscribe(resFolder => {
            this.folder = resFolder;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}