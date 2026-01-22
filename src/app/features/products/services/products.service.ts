import { inject, Injectable } from '@angular/core';
import { allProducts, IAllProductsResponse } from '../../home/interfaces/IAllProductsResponse';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app.apis';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttp {
  allProducts!: allProducts[];

  totalProducts = 0;
  productDetails!: allProducts;

  getAllProducts(page = 1, limit = 8): void {
    this.http
      .get<IAllProductsResponse>(APP_APIS.PRODUCT.allproducts + `?page=${page}&limit=${limit}`)
      .subscribe((response) => {
        this.allProducts = response.data;
        this.totalProducts = response.results;
      });
  }

  getProductsById(productId: string) {
    return this.http
      .get<{ data: allProducts }>(APP_APIS.PRODUCT.allproducts + `/${productId}`)
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
      });
  }
}
