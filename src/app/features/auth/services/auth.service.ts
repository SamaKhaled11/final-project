import { routes } from './../../../app.routes';
import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app.apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  private readonly router = inject(Router);
  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.AUTH.login, userData);
  }

  signup(userData: {}) {
    return this.http.post(APP_APIS.AUTH.signup, userData);
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  decodeToken(token: string): boolean | void {
    try {
      const userId = (jwtDecode(token) as { id: string })?.id;
      localStorage.setItem(STORED_KEYS.USER_ID, userId);
      return true;
    } catch {
      this.logOut();
    }
  }

  forgetPassword(data: { email: string }) {
    return this.http.post(APP_APIS.AUTH.forgetPassord, data);
  }

  verifyCode(data: { resetCode: string }) {
    return this.http.post(APP_APIS.AUTH.verifyCode, data);
  }
}
