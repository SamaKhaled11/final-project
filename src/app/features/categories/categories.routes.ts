import { Routes } from '@angular/router';

export const categories_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categories-page/categories-page.component').then(
        (m) => m.CategoriesPageComponent,
      ),
  },
  {
    path: 'product-of-category/:categoryName',
    loadComponent: () =>
      import('./components/products-of-category/products-of-category.component').then(
        (m) => m.ProductsOfCategoryComponent,
      ),
  },
];
