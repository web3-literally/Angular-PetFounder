import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public hide = true;

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      receiveNewsletter: false
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  public onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      let { username, email, password, confirmPassword } = this.registerForm.getRawValue();
      this.authService.register(username, email, password, confirmPassword).subscribe(data => {
        this.snackBar.open('Account Registered Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/']);
      });
    }
  }
}
