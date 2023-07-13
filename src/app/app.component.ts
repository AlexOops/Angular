import {Component, OnInit} from '@angular/core';
import {IProduct} from "./models/product";
import {ProductsServices} from "./services/products.services";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  loading = false;
  products$: Observable<IProduct[]>

  // products: IProduct[] = data;

  constructor(private productsServices: ProductsServices) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.products$ = this.productsServices.getAll().pipe(
      tap(() => {
        this.loading = false
      })
    );

    // this.productsServices.getAll().subscribe((products) => {
    //   this.products = products
    //   this.loading = false;
    // }) //подписались
  }
}
