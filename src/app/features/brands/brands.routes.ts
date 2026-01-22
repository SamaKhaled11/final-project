import { Routes } from '@angular/router';

export const BRANDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/brands-page/brands-page.component').then((m) => m.BrandsPageComponent),
  },
  {
    path: 'product-of-brand/:brandName',
    loadComponent: () =>
      import('./components/products-of-brand/products-of-brand.component').then(
        (m) => m.ProductsOfBrandComponent,
      ),
  },
];
