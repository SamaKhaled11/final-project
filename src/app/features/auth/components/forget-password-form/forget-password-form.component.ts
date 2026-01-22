import { Component, inject, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password-form.component.html',
})
export class ForgetPasswordFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  isLoading = false;

  forgetPasswordForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  submit(): void {
    if (this.forgetPasswordForm.invalid) return;

    this.isLoading = true;

    this.authService
      .forgetPassword({ email: this.forgetPasswordForm.controls.email.value })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;

          this.toastr.success(res.message || 'Reset code sent to your email', 'Success');

          this.router.navigate(['/verify-code']);
        },
        error: (err) => {
          this.isLoading = false;

          this.toastr.error(err.error?.message || 'Failed to send reset code', 'Error');
        },
      });
  }
}
