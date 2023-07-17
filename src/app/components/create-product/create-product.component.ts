import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsServices} from "../../services/products.services";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  constructor(private productServices: ProductsServices,
              private modalService: ModalService) {
  }

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  //для обращения к title сразу
  get title() {
    return this.form.controls.title as FormControl
  }

  submit() {
    console.log(this.form.value)

    this.productServices.create({

      //ДОБАВИТЬ ПОЛЯ ОСТАЛЬНЫЕ

      title: this.form.value.title as string,
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 1,
        count: 1
      }
    }).subscribe(() => {
      this.modalService.close()
    })
  }
}
