import { Component, OnInit } from '@angular/core';
import { ApiService, OrderDetails } from './data/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  orderDetailsData: OrderDetails[] = [];
  customernames: String[] = [''];
  customerName: string = '';

  constructor(private _apiService: ApiService) {}

  // On Init method to fetch data and build UI
  ngOnInit(): void {
    this._apiService.getData()
      .subscribe((result: OrderDetails[]) => {
        this.orderDetailsData = result;
        this.customernames = [...this.customernames,
          ...[...new Set(result.map((od: OrderDetails) => od.customer?.name || ''))]];
      })
  }

  // Select change Event
  selectCustomer(event: Event) {
    this.customerName = (<HTMLInputElement>event.target).value;
  }
}
