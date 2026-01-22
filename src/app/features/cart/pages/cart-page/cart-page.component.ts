import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  imports: [LoadingSpinnerComponent, RouterLink, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  public readonly cartService = inject(CartService);
  public readonly tosterService = inject(ToastrService);

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart();
  }

  updateProduct(count: number, productId: string): void {
    this.cartService.updateCart(count, productId);
  }

  deleteCartProduct(productId: string): void {
    this.cartService.deleteCartProduct(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
