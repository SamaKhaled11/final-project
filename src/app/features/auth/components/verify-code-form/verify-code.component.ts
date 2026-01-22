import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
})
export class VerifyCodeFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  isLoading = false;

  verifyCodeForm = new FormGroup({
    code: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit(): void {
    if (this.verifyCodeForm.invalid) return;

    const resetCode = this.verifyCodeForm.controls.code.value!;

    this.isLoading = true;

    this.authService.verifyCode({ resetCode }).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        this.toastr.success(res.message || 'Code verified successfully', 'Success');
      },
      error: (err) => {
        this.isLoading = false;

        this.toastr.error(err.error?.message || 'Invalid code', 'Error');
      },
    });
  }
}
