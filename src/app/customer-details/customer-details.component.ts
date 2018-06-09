import { Component, OnInit, Input } from '@angular/core';

import { Customer } from '../customer';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
 
  @Input() customer: Customer;//부모쪽의 html에서 값을 전달한다. 즉 customer.component.html에서 전달받았다.
 
  constructor(private dataService: DataService) {}
 
  ngOnInit() {
  }

  delete(): void {
    this.dataService.delete(this.customer.id).then(() => this.goBack());
  }
 
  private goBack(): void {
    window.location.replace('');
  }

}