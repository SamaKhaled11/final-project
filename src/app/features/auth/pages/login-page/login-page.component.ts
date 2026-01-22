import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {}
