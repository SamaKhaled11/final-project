import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './../../../cart/interfaces/ICartResponse';
import { Component, inject, Input } from '@angular/core';
import { allProducts } from '../../../home/interfaces/IAllProductsResponse';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  public readonly cartService = inject(CartService);
  public readonly tosterService = inject(ToastrService);
  private readonly spinnerService = inject(NgxSpinnerService);
  private readonly wishlistService = inject(WishlistService);

  @Input({ required: true }) prod!: allProducts;

  addToCart(productId: string): void {
    this.spinnerService.show('atom');
    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        this.cartService.numOfCartItems = response.numOfCartItems;
        this.tosterService.success('product added successfully', undefined);
        this.spinnerService.hide('atom');
      },
      error: (error: HttpErrorResponse) => {
        this.tosterService.error('failed to add product');
        this.spinnerService.hide('atom');
      },
    });
  }

  addToWishlist(productId: string): void {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.tosterService.success('added to wishlist');
      },
      error: () => {
        this.tosterService.error('failed to add to wishlist');
      },
    });
  }
  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.prod._id);
  }
}
