import { Brand, GetBrandsResponse } from './../interfaces/IGetAllBrandsResponse';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app.apis';
import { allProducts, IAllProductsResponse } from '../../home/interfaces/IAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseHttp {
  allBrands!: Brand[];

  getAllBrands() {
    this.http.get<GetBrandsResponse>(APP_APIS.BRANDS.allBrands).subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
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
