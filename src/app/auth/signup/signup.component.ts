import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "../auth.service";


@Component ({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit{

    get email() {return this.signupForm.get('email')};
    get password() {return this.signupForm.get('password')};
    get confirmPassword() {return this.signupForm.get('confirmPassword')};


    matchingValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            let confirmPassword = control.value;
            let password = this.password?.value;
    
            if(!confirmPassword) {
                return null;
            }
            
            if(password === confirmPassword) {
                return null;
            } else {
                return { confirmPassword: true };
               
            }
    
        }
    }

    constructor(private authService: AuthService,
                private router: Router) {

    }
    
    ngOnInit(): void {
        this.confirmPassword?.setValidators([this.matchingValidator()]);
        this.confirmPassword?.updateValueAndValidity();
    }

    signupForm = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
        'confirmPassword': new FormControl(null, [Validators.required])
    });
    


    onSubmit() {
        if(!this.signupForm.valid) {
            return;
        }

        const email = this.signupForm.value.email;
        const password = this.signupForm.value.password;

        this.authService.signup(email, password).pipe(take(1)).subscribe({
            next: userData => {
                const userEmail = userData.profile.data.email;
                console.log('signUp');
                this.authService.user.next(userEmail);

                this.router.navigate(['/audiostore']);
            }, 
            error: error => {
                console.log(error);
            }
        });
        
    }


    
}