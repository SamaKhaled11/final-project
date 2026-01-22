import { Pipe, PipeTransform } from '@angular/core';
import { allProducts } from '../../features/home/interfaces/IAllProductsResponse';
@Pipe({
  name: 'filterItem',
  pure: false,
})
export class FilterItemPipe implements PipeTransform {
  transform(items: any[], searchText: string, keys: string[]): any[] {
    return items.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchText.toLowerCase()))
    );
  }
}
