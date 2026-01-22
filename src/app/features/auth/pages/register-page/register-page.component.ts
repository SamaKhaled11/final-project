import { RegisterFormComponent } from './../../components/register-form/register-form.component';
import { Component, inject } from '@angular/core';
@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {}
