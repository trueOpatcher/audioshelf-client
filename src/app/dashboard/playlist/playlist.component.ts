import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, take } from "rxjs";
import { AudioService } from "../audio.service";
import { StreamState } from "../models/stream-state";
import { PlaylistService } from "./playlist.service";
import { Folder } from "../models/folder.model";
import { AudiostoreService } from "src/app/audiostore/audiostore.service";



@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})



export class PlaylistComponent implements OnInit, OnDestroy {

    stateSub!: Subscription;
    folderSub!: Subscription;

    state!: StreamState;
    currentFile: any = {};

    @ViewChild('checkMark') inputEl!: ElementRef;

    folder!: Folder;



    constructor(private playlistService: PlaylistService,
                private audioService: AudioService,
                private audiostoreService: AudiostoreService) {

                    this.stateSub = this.audioService.getState().subscribe( state => {
                        this.state = state;
                    });
    }

    ngOnInit(): void {
        this.updateContent();
        
        this.folderSub = this.playlistService.folder.subscribe(folder => {
            if(folder){
                this.folder = folder;
            }
            
        })

        this.audioService.currentFile.subscribe(currentFile => {
            this.currentFile = currentFile;

            if(currentFile) {
                const index = this.audioService.currentFile.getValue().index;
                this.inputEl.nativeElement.children[index + 2].children[0].checked = true;
            }
          })
    }

    


    openFile(file: any, index: number) {
        this.audioService.currentFile.next({file, index});
        this.audioService.stop();
        this.playStream(file.url);
    }

    playStream(url: string) {
        this.audioService.playStream(url).subscribe(events => {
            console.log('playlist listen');

        });
    }

    



    uploadForm = new FormGroup({
        'file': new FormControl(null)
    });



    

    private updateContent() {

        
    }

    onAddAudio(folderName: string) {
        
    }

    onDeleteFolder() {
        
    }

    ngOnDestroy() {
        this.stateSub.unsubscribe();
        this.folderSub.unsubscribe();
    }
}