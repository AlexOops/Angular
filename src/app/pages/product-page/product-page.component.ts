import {Component, OnInit} from '@angular/core';
import {ProductsServices} from "../../services/products.services";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit  {
  title = 'angular-app';
  loading = false;
  term: string;

  // products$: Observable<IProduct[]>;
  // products: IProduct[] = data;

  constructor(
    public productsServices: ProductsServices,
    public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loading = true;

    // this.products$ = this.productsServices.getAll().pipe(
    //   tap(() => {
    //     this.loading = false
    //   })
    // );

    this.productsServices.getAll().subscribe(() => {
      this.loading = false;
    }) //подписались
  }
}
