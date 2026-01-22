import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';
import { STORED_KEYS } from '../../../../core/constants/StoredKeys';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loginForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  redirectCounter = 5;
  isShowPassword = true;

  constructor() {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submitData(): void {
    if (this.isLoading) return;
    this.loginForm.markAllAsTouched();
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'login successfully';
          this.isLoading = false;

          const token = response.token;

          localStorage.setItem(STORED_KEYS.USER_TOKEN, token);
          this.authService.decodeToken(token);
          interval(1000)
            .pipe(take(5))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/home');
              }
            });
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
        },
      });
    }
  }
}
