import { Component, inject, OnInit } from '@angular/core';
import { OrdersServicr } from '../../services/order.service';

@Component({
  selector: 'app-orders-page',
  imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
})
export class OrdersPageComponent implements OnInit {
  public readonly ordersServicr = inject(OrdersServicr);

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this.ordersServicr.getUserOrders();
  }
}
