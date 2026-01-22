import { response } from 'express';
import { Component, OnInit, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../interfaces/IALLWishlistResponse';
import { CardProductsComponent } from '../../../products/components/card-products/card-products.component';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
  imports: [CardProductsComponent],
})
export class WishlistPageComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  wishlistProducts: Product[] = [];

  ngOnInit(): void {
    this.wishlistService.getAllProductsInWishlist().subscribe();

    this.wishlistService.getWishlistProducts().subscribe({
      next: (products) => {
        this.wishlistProducts = products;
      },
    });
  }
  remove(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe();
  }
}
