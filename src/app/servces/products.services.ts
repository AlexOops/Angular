import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {IProduct} from "../models/product";

@Injectable({         //можем сразу использовать
  providedIn: 'root'
})

export class ProductsServices {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IProduct[]> { // указали с какми данными работаем
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: {limit: 5} //лимит 5 шт
      })
    }).pipe(
      delay(2000)
    )
  }
}
