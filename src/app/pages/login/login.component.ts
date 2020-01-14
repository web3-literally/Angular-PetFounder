import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {AuthService} from '../../services/auth/auth.service';
import {matchingPasswords, emailValidator} from 'src/app/theme/utils/app-validators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public hide = true;

    constructor(
        public authService: AuthService,
        public fb: FormBuilder,
        public router: Router,
        public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            rememberMe: false
        });
    }

    public onLoginFormSubmit(values: Object): void {
        if (this.loginForm.valid) {
            let {email, password} = this.loginForm.getRawValue();
            this.authService.login(email, password).subscribe(data => {
                this.snackBar.open('You logged in successfully!', '×', {panelClass: 'success', verticalPosition: 'top', duration: 3000});
                this.router.navigate(['/']);
            });
        }
    }

}
