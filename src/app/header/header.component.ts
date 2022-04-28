import { Component } from "@angular/core";
import { Subscription, take } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { PlaylistService } from "../dashboard/playlist/playlist.service";

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isUserAuth = false;
    private sub!: Subscription;

    constructor(private authService: AuthService,
                private router: Router,
                private playlistService: PlaylistService) {

    }

    ngOnInit() {
       this.sub = this.authService.user.subscribe(isUserExists => {
            this.isUserAuth = !!isUserExists;
        });
    }

    onLogout() {
        this.authService.logout().subscribe();
    }

    onLogin() {
        this.router.navigate(['/auth']);
    }

    onClickAudioshelf() {
        this.playlistService.folder.pipe(take(1)).subscribe(folder => {
            if(folder) {
                this.router.navigate(['/dashboard']);
            }
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
}