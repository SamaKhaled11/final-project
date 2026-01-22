import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  errorMessage = '';
  successMessage = '';
  isLoading = false;
  redirectCounter = 5;

  registerForm!: FormGroup;

  constructor() {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
        rePassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      this.passwordMissMatch
    );
  }

  //   registerForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(5)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
  //     rePassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
  //     phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  //   }, this.passwordMissMatch
  // );

  // registerForm = new FormGroup(
  //   {
  //     name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/),
  //     ]),
  //     rePassword: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/),
  //     ]),
  //     phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  //   },
  //   this.passwordMissMatch
  // );

  passwordMissMatch(registerForm: AbstractControl) {
    const password = registerForm.get('password')?.value;
    const rePassword = registerForm.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { passwordMissMatch: true };
    }
  }

  submitData(): void {
    if (this.isLoading) return;
    this.registerForm.markAllAsTouched();
    this.errorMessage = '';
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'account created successfully';
          this.isLoading = false;

          interval(1000)
            .pipe(take(5))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/login');
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
