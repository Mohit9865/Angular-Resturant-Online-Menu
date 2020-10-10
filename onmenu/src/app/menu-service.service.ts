import { Injectable } from '@angular/core';
import { Items } from './model/item.model';
import { CustomerInterFace } from '../app/model/customer.model';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  customerUrl = "http://localhost:3000/Customer";
  constructor(private http:HttpClient) { }

  getRiceItems():Observable<Items[]>{
    return this.http.get<Items[]>("http://localhost:3000/RiceItem");
  }

  getStarterItems():Observable<Items[]>{
    return this.http.get<Items[]>("http://localhost:3000/Starter");
  }

  getchapatiItems():Observable<Items[]>{
    return this.http.get<Items[]>("http://localhost:3000/Chappatis");
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}

getCustomerOrderdetailById(id:number):Observable<CustomerInterFace>{
  return this.http.get<CustomerInterFace>(`${this.customerUrl}/${id}`).pipe(catchError(this.handleError));
}


  putCustomer(Customerdata:CustomerInterFace):Observable<CustomerInterFace>{
   return this.http.post<CustomerInterFace>("http://localhost:3000/Customer",Customerdata,{
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
})
.pipe(catchError(this.handleError));
  }

  getCustomerOrderdetail():Observable<CustomerInterFace[]>{
    return this.http.get<CustomerInterFace[]>("http://localhost:3000/Customer").pipe(catchError(this.handleError));
  }

  updateOrder(customer:CustomerInterFace):Observable<void>{
    return this.http.put<void>(`${this.customerUrl}/${customer.id}`,customer, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  DeleteOrder(id:number):Observable<void>{
    return this.http.delete<void>(`${this.customerUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

}
