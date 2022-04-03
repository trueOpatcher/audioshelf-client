import { Component, OnInit } from "@angular/core";
import { Folder } from "src/app/dashboard/models/folder.model";
import { AudiostoreService } from "../audiostore.service";
import { Router } from "@angular/router";
import { PlaylistService } from '../../dashboard/playlist/playlist.service';
import { AuthService } from "src/app/auth/auth.service";



@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html', 
    styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit {

    
    folders: Folder[] = [];
    isUserAdmin: boolean = false;

    constructor(private audiostoreService: AudiostoreService,
                private router: Router,
                private playlistService: PlaylistService,
                private authService: AuthService) {

    }


    ngOnInit(): void {
        this.audiostoreService.fetchFolders().subscribe(folders => {
            
            this.folders = folders;
            
        })

        this.authService.isUserAdmin().subscribe(isAdmin => {
            this.isUserAdmin = isAdmin;
        })
    }

    onClickEdit(folderName: string) {
        if(!folderName || folderName === '') return;

        console.log(folderName);
        this.router.navigate(['audiostore/edit', folderName]);

    }

    onCreateFolder() {
        this.router.navigate(['audiostore/edit']);
    }

    onClickView(folder: Folder) {
        this.playlistService.folder.next(folder);
    }

    

}