import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../data/product';
import { Customer } from './customer';
import { Order } from './order';

export interface OrderDetails extends Order {
  customer?: Customer,
  product?: Product
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  products$ = this.http.get<Product[]>('api/products');
  customers$ = this.http.get<Customer[]>('api/customers');
  orders$ = this.http.get<Order[]>('api/orders');

  constructor(private http: HttpClient) {}

  getData(): Observable<OrderDetails[]> {
    return forkJoin([this.customers$,this.orders$,this.products$])
      .pipe(
        map((results: [Customer[], Order[], Product[]]) => {
          return results[1].map((order: Order) => {
            const customer: Customer = { ...results[0].find((c: Customer) => order.customerId === c.id) };
            const product: Product = { ...results[2].find((p: Product) => order.productId === p.id) };
            return {...order, customer, product};
          });
        })
      )
  }
}
