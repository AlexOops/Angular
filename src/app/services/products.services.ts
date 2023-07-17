import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHandler, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {ErrorService} from "./error.service";

@Injectable({         //можем сразу использовать
  providedIn: 'root'
})

export class ProductsServices {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> { // указали с какми данными работаем
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: {limit: 6} //лимит 5 шт
      })
    }).pipe(
      delay(2000),
      retry(2),
      tap(products => this.products = products), // перехватили данные и положили в массив
      catchError(this.errorHandler.bind(this))
    );
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(
        tap(prod => this.products.push(prod))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message);
  }
}
