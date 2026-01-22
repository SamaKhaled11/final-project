import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAllCategoriesResponse, ICategory } from '../interfaces/IAllCategoriesRespones';
import { response } from 'express';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { environment } from '../../../../environments/environment';
import { APP_APIS } from '../../../core/constants/app.apis';
import { allProducts, IAllProductsResponse } from '../../home/interfaces/IAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseHttp {
  allCategories!: ICategory[];

  getAllCategories() {
    return this.http
      .get<IAllCategoriesResponse>(APP_APIS.CATEGORIES.allCategories)
      .subscribe((response) => {
        this.allCategories = response.data;
      });
  }
  allProducts!: allProducts[];

  totalProducts = 0;
  productDetails!: allProducts;

  getAllProducts(): void {
    this.http.get<IAllProductsResponse>(APP_APIS.PRODUCT.allproducts).subscribe((response) => {
      this.allProducts = response.data;
      this.totalProducts = response.results;
    });
  }
}
