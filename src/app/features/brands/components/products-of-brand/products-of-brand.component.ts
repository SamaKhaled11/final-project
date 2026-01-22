import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { CardProductsComponent } from '../../../products/components/card-products/card-products.component';

@Component({
  selector: 'app-products-of-brand',
  imports: [CardProductsComponent],
  templateUrl: './products-of-brand.component.html',
  styleUrl: './products-of-brand.component.css',
})
export class ProductsOfBrandComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly brandsService = inject(BrandsService);

  brandName!: string;
  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.brandName = this.activatedRoute.snapshot.paramMap.get('brandName')!;

    this.brandsService.getAllProducts();

    setTimeout(() => {
      this.filterProductsByBrand();
    }, 0);
  }

  filterProductsByBrand(): void {
    this.filteredProducts = this.brandsService.allProducts.filter(
      (product) => product.brand.name === this.brandName,
    );
    console.log(this.filterProductsByBrand);
  }
}
