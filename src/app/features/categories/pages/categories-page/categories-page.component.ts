import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  imports: [SectionHeaderComponent, RouterLink],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  public readonly categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories();
  }
}
