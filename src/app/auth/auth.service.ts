import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, take } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})

export class AuthService {
    private SERVER_URL = environment.serverUrl;



    user = new BehaviorSubject<string | null>(null);

    constructor(private http: HttpClient,
                private router: Router) {

    }



    login(email: string, password: string) {
        return this.http.post<any>(this.SERVER_URL + '/auth/login', {email: email, password: password});
    }

    signup(email: string, password: string) {
        return this.http.post<any>(this.SERVER_URL + '/auth/signup', {email: email, password: password});
        
    }

    logout() {

       return this.http.get(this.SERVER_URL + '/auth/logout').pipe(take(1),
         map(() => {
            console.log('session deleted');
            this.user.next(null);
            this.router.navigate(['/auth']);
         }));
    }

    autoLogin() {
        return this.http.get<any>(this.SERVER_URL + '/auth/isauth').pipe(
            take(1),
            map(authData => {
                if(authData.email) {
                    const email = authData.email;
                    this.user.next(email);
                    this.router.navigate(['/audiostore']);
                }
            }));
    }

    isUserAdmin() {
        return this.http.get<any>(this.SERVER_URL + '/auth/isadmin').pipe(take(1));
    }
} 