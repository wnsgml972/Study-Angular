import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http'

import 'rxjs/add/operator/toPromise'

import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'api/customers';
  private headers = new Headers({'Content-Type' : 'application/json'}); //header에 json format으로 보냄

  constructor(private http:Http) { }

  getCustomers():Promise<Customer[]>{
    return this.http.get(this.baseUrl)
    .toPromise()
    .then(response => response.json() as Customer[])
    .catch(this.handleError);
  }

  getCustomersByLastName(lastName: string): Promise<Customer[]> {//Promise 형태로 리턴
    const url= `${this.baseUrl}/${lastName}`;//back ticks tab위의 문자. 일일 히 ''안써도됨 줄바꿈 삽입 등등 가능
    return this.http.get(url)
      .toPromise()//async한 처리를 위한 메서드 Observable도 있음
      .then(response => response.json() as Customer[])//promise가 성공해서 return된 경우 response가 넘어온다. Customer라는 변수에 저장한다.
      .catch(this.handleError);//Exception이 발생 했을 때
  }

  create(customer: Customer): Promise<Customer> {
   
    return this.http
      .post(this.baseUrl, JSON.stringify(customer), {headers : this.headers})//customer라는 객체를 json형태로 직렬화(serization) 한다.
      .toPromise()
      .then(() => null)//받는것이 없기 때문에 null
      .catch(this.handleError);
  }
 
  delete(id: number): Promise<void> {
   const url= `${this.baseUrl}/${id}`;

    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
 
  private handleError(error: any): Promise<any> {
    console.error('Error:', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}