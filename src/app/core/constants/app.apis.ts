import { environment } from '../../../environments/environment';

export const APP_APIS = {
  PRODUCT: {
    allproducts: `${environment.baseUrl}products`,
  },
  CATEGORIES: {
    allCategories: `${environment.baseUrl}categories`,
  },
  BRANDS: {
    allBrands: `${environment.baseUrl}brands`,
  },
  AUTH: {
    signup: `${environment.baseUrl}auth/signup`,
    login: `${environment.baseUrl}auth/signin`,
    forgetPassord: `${environment.baseUrl}auth/forgotPasswords`,
    verifyCode: `${environment.baseUrl}auth/verifyResetCode`,
    resetPassword: `${environment.baseUrl}auth/resetPassword`,
    userInfo: `${environment.baseUrl}users`,
  },
  CART: {
    data: `${environment.baseUrl}cart`,
  },
  PAYMENT: {
    online: `${environment.baseUrl}orders/checkout-session`,
    cash: `${environment.baseUrl}orders`,
  },
  ORDERS: {
    orders: `${environment.baseUrl}orders/user`,
  },
  WISHLIST: {
    data: `${environment.baseUrl}wishlist`,
  },
};
