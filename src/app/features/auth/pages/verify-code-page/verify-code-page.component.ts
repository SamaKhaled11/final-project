import { Component } from '@angular/core';
import { VerifyCodeFormComponent } from '../../components/verify-code-form/verify-code.component';

@Component({
  selector: 'app-verify-code-page',
  imports: [VerifyCodeFormComponent],
  templateUrl: './verify-code-page.component.html',
  styleUrl: './verify-code-page.component.css',
})
export class VerifyCodePageComponent {}
