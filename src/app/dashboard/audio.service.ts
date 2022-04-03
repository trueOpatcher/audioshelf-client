import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, map, Observable, Subject, takeUntil, take, mapTo } from 'rxjs';
import { StreamState } from "./models/stream-state";
import * as moment from 'moment';


@Injectable({providedIn: 'root'})


export class AudioService {

    private state: StreamState = {
        playing: false,
        readableCurrentTime: '',
        readableDuration: '',
        duration: undefined,
        currentTime: undefined,
        canplay: false,
        error: false,
        ended: false
      };
      
    private SERVER_URL = environment.serverUrl;

    private audio = new Audio();
    private _stop = new Subject();

    
    currentFile = new BehaviorSubject<any>({});

    private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);


    constructor(private http: HttpClient) {

    }



    audioEvents = [
        'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
      ];

      

      private streamObservable(url: any) {
        return new Observable(observer => {
          this.audio.src = url;
          this.audio.load();
          this.audio.play();
          const handler = (event: Event) => {
            this.updateStateEvents(event);
            observer.next(event);
          };
      
          this.addEvents(this.audio, this.audioEvents, handler);
          return () => {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.removeEvents(this.audio, this.audioEvents, handler);
            this.resetState();
          };
        });
      }

      private addEvents(obj = new Audio(), events: any[], handler: (event: Event) => void) {
        events.forEach(event => {
          obj.addEventListener(event, handler);
        });
      }
    
      private removeEvents(obj = new Audio(), events: any[], handler: (event: Event) => void) {
        events.forEach(event => {
          obj.removeEventListener(event, handler);
        });
      }

      playStream(url: string) {
            return this.streamObservable(url).pipe<any>(takeUntil(this._stop));
      }
    
      play() {
        this.audio.play();
      }
    
      pause() {
        this.audio.pause();
      }
    
      stop() {
        this._stop.next(null);
      }
    
      seekTo(seconds: number) {
        this.audio.currentTime = seconds;
      }
    
      formatTime(time: number, format: string = 'mm:ss') {
        const momentTime = time * 1000;
        return moment.utc(momentTime).format(format);
      }

      private updateStateEvents(event: Event): void {
        switch (event.type) {
          case 'canplay':
            this.state.duration = this.audio.duration;
            this.state.readableDuration = this.formatTime(this.state.duration);
            this.state.canplay = true;
            break;
          case 'playing':
            this.state.playing = true;
            break;
          case 'pause':
            this.state.playing = false;
            break;
          case 'timeupdate':
            this.state.currentTime = this.audio.currentTime;
            this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
            break;
          case 'error':
            this.resetState();
            this.state.error = true;
            break;
          case 'ended':
            this.state.ended = true;
            break;
        }
        this.stateChange.next(this.state);
      }
    
      private resetState() {
        this.state = {
          playing: false,
          readableCurrentTime: '',
          readableDuration: '',
          duration: undefined,
          currentTime: undefined,
          canplay: false,
          error: false,
          ended: false
        };
      }

      cleanState() {
        this.resetState();
        this.stateChange.next(this.state);
      }
    
      getState(): Observable<StreamState> {
        return this.stateChange.asObservable();
      }
    
}