import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { CardProductsComponent } from '../../../products/components/card-products/card-products.component';

@Component({
  selector: 'app-products-of-category',
  imports: [CardProductsComponent],
  templateUrl: './products-of-category.component.html',
  styleUrl: './products-of-category.component.css',
})
export class ProductsOfCategoryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly categoriesService = inject(CategoriesService);

  categoryName!: string;
  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('categoryName')!;

    this.categoriesService.getAllProducts();

    setTimeout(() => {
      this.filterProductsByCategory();
    }, 0);
    console.log(this.activatedRoute.snapshot.url);
    console.log(this.activatedRoute.snapshot.params);
  }

  filterProductsByCategory(): void {
    this.filteredProducts = this.categoriesService.allProducts.filter(
      (product) => product.category.name === this.categoryName,
    );
    console.log(this.filterProductsByCategory);
  }
}
