import { Component, OnDestroy, OnInit } from "@angular/core";
import { Folder } from "src/app/dashboard/models/folder.model";
import { AudiostoreService } from "../audiostore.service";
import { PlaylistService } from '../../dashboard/playlist/playlist.service';
import { Subscription, take } from "rxjs";
import { Router } from "@angular/router";

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    animations: [
        trigger('faceImg', [
            state('end', style({
                transform: 'perspective(200px) rotateY( -90deg )',
                transformOrigin: '100% 0%'
                
            })),
            state('start', style({
                transform: 'perspective(200px) rotateY( 0deg )',
                
                
            })),
            transition('* => *', animate('300ms cubic-bezier(0.645, 0.045, 0.355, 1)'))
        ]),
        trigger('backImg', [
            state('end', style({
                transform: 'perspective(200px) rotateY(90deg)',
                transformOrigin: '0% 0%'
            })),
            state('start', style({
                transform: 'perspective(200px) rotateY( 0deg )',

            })),
            transition('* => *', animate('300ms cubic-bezier(0.645, 0.045, 0.355, 1)'))
        ]),
        trigger('info', [
            state('start', style({
                opacity: '0'
            })),
            state('name', style({
                opacity: '1'
            })),
            state('author', style({
                opacity: '1'
            })),
            state('description', style({
                opacity: '1'
            })),
            state('folder', style({
                opacity: '1'
            })),
            transition('start => name', animate('2000ms ease-out')),
            transition('start => author', animate('2000ms 0.4s ease-out')),
            transition('start => description', animate('2000ms 0.8s ease-out')),
            transition('start => folder', animate('2000ms ease-out'))
        ]),
    ]
})

export class ReviewComponent implements OnInit, OnDestroy {

    anmStart = false;
    folder!: Folder;
    sub!: Subscription;

    constructor(private audiostoreService: AudiostoreService,
                private playlistService: PlaylistService,
                private router: Router) {

    }

    ngOnInit() {
        this.sub = this.playlistService.folder.subscribe(folder => {
            if(folder != null) {
                if(folder === this.folder) return;
                this.anmStart = false;
                
                setTimeout(() => {
                    this.folder = folder;
                }, 300);
                setTimeout(() => {
                    
                    this.anmStart = true;
                }, 500);
                
            }
        })
    }

    

    onClickGo(folder: Folder) {
        this.playlistService.folder.next(folder);
        this.router.navigate(['/dashboard']);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
}