import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { getOwlOptions } from '../../../../core/services/utilities/owl-options.service';


@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent {

  public readonly categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories():void{
    this.categoriesService.getAllCategories()
  }
    customOptions: OwlOptions = getOwlOptions({responsive:{
         0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 7
      }
    }})
}
