import { ProductsService } from './../../services/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterItemPipe } from '../../../../shared/pipes/filter.products.pipe';

@Component({
  selector: 'app-products-page',
  imports: [
    CardProductsComponent,
    FormsModule,
    SectionHeaderComponent,
    LoadingSpinnerComponent,
    NgxPaginationModule,
    FilterItemPipe,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  public readonly ProductsService = inject(ProductsService);
  public readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);
  public readonly viewPortScroller = inject(ViewportScroller);

  page = 1;
  limit = 20;
  searchText = '';

  constructor() {
    const page = this.activatedRoute.snapshot.queryParamMap.get('page')!;
    this.activatedRoute.snapshot.queryParams['page'];
    this.page = page ? Number(page) : 1;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.ProductsService.getAllProducts(this.page, this.limit);
  }

  pageChanges($event: number): void {
    this.page = $event;
    this.getAllProducts();
    this.viewPortScroller.scrollToPosition([0, 0], {
      behavior: 'smooth',
    });
    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
    });
  }
}
