import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { PlaylistService } from "./playlist/playlist.service";


@Component ({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    constructor(private playlistService: PlaylistService,
                private router: Router) {

    }

    ngOnInit() {
        this.playlistService.folder.pipe(take(1)).subscribe(folder => {
            if(!folder) {
                this.router.navigate(['/audiostore']);
            }
            
        })
    }
    
}