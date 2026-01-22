import { Product } from './../interfaces/ICartResponse';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app.apis';
import { response } from 'express';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { CartDetails, ICartResponse } from '../interfaces/ICartResponse';
import { log, trace } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseHttp {
  userCart!: CartDetails;

  numOfCartItems = 0;

  originalPrice = 0;
  totalPrice = 0;

  getCart() {
    this.http.get<ICartResponse>(APP_APIS.CART.data, {}).subscribe({
      next: (response) => {
        this.userCart = response.data;
        this.numOfCartItems = response.numOfCartItems;
        this.originalPrice = this.userCart.totalCartPrice;
        this.totalPrice = this.originalPrice + 63;
      },
    });
  }

  addToCart(productId: string) {
    return this.http.post<ICartResponse>(APP_APIS.CART.data, {
      productId: productId,
    });
  }

  updateCart(count: number, ProductId: string) {
    this.http
      .put<ICartResponse>(`${APP_APIS.CART.data}/${ProductId}`, {
        count: count,
      })
      .subscribe({
        next: (response) => {
          this.userCart = response.data;
          this.originalPrice = this.userCart.totalCartPrice;
          this.totalPrice = this.originalPrice + 63;
        },
      });
  }

  deleteCartProduct(productId: string) {
    this.http.delete<ICartResponse>(`${APP_APIS.CART.data}/${productId}`, {}).subscribe({
      next: (response) => {
        this.userCart = response.data;
        this.originalPrice = this.userCart.totalCartPrice;
        this.totalPrice = this.originalPrice + 63;
      },
    });
  }

  clearCart() {
    this.http.delete(APP_APIS.CART.data, {}).subscribe({
      next: (response) => {
        this.userCart.products = [];
        this.originalPrice = 0;
        this.totalPrice = 0;
      },
    });
  }
}
