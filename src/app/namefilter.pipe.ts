import { Pipe, PipeTransform } from '@angular/core';
import { OrderDetails } from './data/api.service';

/*
Filter Pipe to filter data based on customer name
*/
@Pipe({
    name: 'filter',
    pure: false
})

export class NameFilterPipe implements PipeTransform {
    transform(items: OrderDetails[], arg: string): OrderDetails[] {
      const filterdData = items.filter(item => item.customer?.name?.indexOf(arg) !== -1);
      return filterdData.length > 0 ? filterdData : items;
    }
}
