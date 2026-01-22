import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { App } from '../../../app';
import { APP_APIS } from '../../../core/constants/app.apis';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { isPlatformBrowser } from '@angular/common';
import { response } from 'express';
import { IALLOrdersResponse } from '../interfaces/IALLOrdersResponse';

@Injectable({
  providedIn: 'root',
})
export class OrdersServicr extends BaseHttp {
  private readonly platformId = inject(PLATFORM_ID);

  userOrders!: IALLOrdersResponse[];

  getUserOrders() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem(STORED_KEYS.USER_ID);
      this.http.get<IALLOrdersResponse[]>(`${APP_APIS.ORDERS.orders}/${userId}`).subscribe({
        next: (response) => {
          this.userOrders = response;
        },
      });
    }
  }
}
