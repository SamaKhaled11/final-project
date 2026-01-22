import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app.apis';
import { IALLWishlistResponse, Product } from '../interfaces/IALLWishlistResponse';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends BaseHttp {
  private wishlistProducts$ = new BehaviorSubject<Product[]>([]);

  getAllProductsInWishlist() {
    return this.http.get<IALLWishlistResponse>(APP_APIS.WISHLIST.data).pipe(
      tap((res) => {
        this.wishlistProducts$.next(res.data);
      })
    );
  }

  getWishlistProducts() {
    return this.wishlistProducts$.asObservable();
  }

  addToWishlist(productId: string) {
    return this.http
      .post<{ message: string }>(APP_APIS.WISHLIST.data, {
        productId,
      })
      .pipe(
        tap(() => {
          this.getAllProductsInWishlist().subscribe();
        })
      );
  }

  removeFromWishlist(productId: string) {
    return this.http.delete(APP_APIS.WISHLIST.data + `/${productId}`).pipe(
      tap(() => {
        const current = this.wishlistProducts$.value;
        this.wishlistProducts$.next(current.filter((p) => p._id !== productId));
      })
    );
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistProducts$.value.some((product) => product._id === productId);
  }
}
