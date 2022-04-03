import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, take } from "rxjs";
import { AudioService } from "../audio.service";
import { PlaylistService } from "../playlist/playlist.service";
import { File } from "../models/file.model";
import { StreamState } from "../models/stream-state";
import { Folder } from "../models/folder.model";
import { AudiostoreService } from "src/app/audiostore/audiostore.service";





@Component ({
    selector: 'app-audio-section',
    templateUrl: './audio-section.component.html',
    styleUrls: ['./audio-section.component.scss']
})

export class AudioSectionComponent implements OnInit, OnDestroy {

    constructor (private audioService: AudioService,
                 private playlistService: PlaylistService,
                 private audiostoreService: AudiostoreService,) {
        
    }

    state!: StreamState;
    stateSub!: Subscription;
    fileSub!: Subscription;
    folder!: Folder;
    currentFile: any = {};
    length!: number;


    ngOnInit() {

        this.stateSub = this.audioService.getState().subscribe( state => {
            this.state = state;

            if(state.ended) {
                this.next();
            }
        });

        this.fileSub = this.audioService.currentFile.subscribe(currentFile => {
            this.currentFile = currentFile;
        })
        this.playlistService.folder.pipe(take(1)).subscribe(folder => {
            if(folder) {
                this.folder = folder;
                this.length = folder.files.length - 1;
            }
            
        })
        //
        // this.audiostoreService.fetchFolders().subscribe(folders => {
        //     this.folder = folders[0];
        // })
            ////
    }

    onSliderChangeEnd(change: any) {
        this.audioService.seekTo(change.value);
    }


    play() {
        this.audioService.play();
    }
  
    pause() {
        this.audioService.pause();
    }

    previous() {

        const index = this.currentFile.index - 1;
        const file = this.folder.files[index];
        this.openFile(file, index);
    }

    next() {
        const index = this.currentFile.index + 1;
        const file = this.folder.files[index];
        this.openFile(file, index);
    }

    openFile(file: File, index: number) {
        this.audioService.currentFile.next({ file, index });
        this.audioService.stop();
        this.playStream(file.url);
    }

    playStream(url: string) {
        this.audioService.playStream(url).subscribe(events => {
        });
    }

    
 

    ngOnDestroy(): void {
        this.audioService.stop();
        this.stateSub.unsubscribe();
        this.fileSub.unsubscribe();
        this.audioService.cleanState();
    }
}