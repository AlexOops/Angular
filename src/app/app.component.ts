import {Component, OnInit} from '@angular/core';
import {IProduct} from "./models/product";
import {products as data} from "./data/products";
import {ProductsServices} from "./servces/products.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  products: IProduct[] = data;
  loading = false;

  constructor(private productsServices: ProductsServices) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.productsServices.getAll().subscribe((products) => {
      this.products = products
      this.loading = false;
    }) //подписались
  }
}
