import { Component, OnInit } from '@angular/core';

import { Customer } from '../customer';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  selectedCustomer: Customer;

  constructor(private dataService: DataService) {}//생성자를 통해 의존성 주입이 이루어 진다.
 
  getCustomers() {
     this.dataService.getCustomers().then(customers => this.customers = customers);//Async, getCustomers()까지 하면 promise형태
  }
 
  ngOnInit(): void {
     this.getCustomers();
  }
 
  onSelect(cust: Customer): void {
    this.selectedCustomer = cust;
  }

}