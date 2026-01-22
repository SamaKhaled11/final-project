import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.urlWithParams.includes('products')) {
    const spinner = inject(NgxSpinnerService);
    spinner.show('square-spin');
    return next(req).pipe(
      finalize(() => {
        spinner.hide('square-spin');
      })
    );
  }
  const spinner = inject(NgxSpinnerService);
  spinner.show('atom');
  return next(req).pipe(
    finalize(() => {
      spinner.hide('atom');
    })
  );
};
