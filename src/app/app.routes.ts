import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout/main-layout.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { authGuard } from './core/guards/auth-guard';
import { loggedGuard } from './core/guards/logged-guard';

export const routes: Routes = [
  //auth
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: AUTH_ROUTES,
  },

  //user
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'details/:id/:slug',
        component: ProductDetailsComponent,
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then((m) => m.categories_routes),
      },
      {
        path: 'brands',
        loadChildren: () => import('./features/brands/brands.routes').then((m) => m.BRANDS_ROUTES),
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then((m) => m.CART_ROUTES),
      },
      {
        path: 'payment/:cartId',
        loadChildren: () =>
          import('./features/payment/payments.routes').then((m) => m.PAYMENTS_ROUTES),
      },
      {
        path: 'allorders',
        loadChildren: () => import('./features/orders/orders.routes').then((m) => m.ORDERS_ROUTES),
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('./features/wishlist/wishlist.routes').then((m) => m.wishlist_ROUTES),
      },
    ],
  },

  //not-found
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
