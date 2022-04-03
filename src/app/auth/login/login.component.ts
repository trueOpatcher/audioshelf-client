import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "../auth.service";


@Component ( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    constructor(private authService: AuthService,
                private router: Router) {

    }
    
    loginForm = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
    });


    onSubmit() {
        if(!this.loginForm.valid) {
            return;
        }


        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.authService.login(email, password).pipe(take(1)).subscribe({
            next: userData => {
                const userEmail = userData.profile.data.email;
                this.authService.user.next(userEmail);

                this.router.navigate(['/audiostore']);
            }, 
            error: error => {
                console.log(error);
            }  
        });

    }

   onClickAdmin() {
    const email = 'testy@gmail.com';
    const password = 'qwerty';

    this.authService.login(email, password).pipe(take(1)).subscribe({
        next: userData => {
            const userEmail = userData.profile.data.email;
            this.authService.user.next(userEmail);

            this.router.navigate(['/audiostore']);
        }, 
        error: error => {
            console.log(error);
        }  
    });

   }


   onClickUser() {
    const email ='test1@gmail.com';
    const password = 'qwertyu';

    this.authService.login(email, password).pipe(take(1)).subscribe({
        next: userData => {
            const userEmail = userData.profile.data.email;
            this.authService.user.next(userEmail);

            this.router.navigate(['/audiostore']);
        }, 
        error: error => {
            console.log(error);
        }  
    });

   }
   
}