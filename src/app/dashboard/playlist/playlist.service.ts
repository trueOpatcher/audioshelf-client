import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Folder } from "../models/folder.model";

@Injectable({providedIn: 'root'})

export class PlaylistService implements OnInit {
    
    
    folder = new BehaviorSubject<Folder | null>(null);

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {
        
    }

    
}