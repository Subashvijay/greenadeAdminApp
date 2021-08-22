import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductItems } from '../Model/productItems';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  editeProductId: string;
  productForm: FormGroup;
  isCreateNew = false;
  productList: ProductItems[] = [
    {
      productID: '1',
      productName: 'tomato',
      pricePerQuantity: '20',
      category: 'vegetables',
      discountInPercent: '20',
      finalPricePerQty: '100',
      availableQty: '100',
      imgUrl: 'https://m.media-amazon.com/images/I/71DYmqoq-VL._SL1024_.jpg',
      quantityType: 'Kg'
    },
    {
      productID: '2',
      productName: 'tomato',
      pricePerQuantity: '20',
      category: 'vegetables',
      discountInPercent: '20',
      finalPricePerQty: '100',
      availableQty: '100',
      imgUrl: 'https://m.media-amazon.com/images/I/71DYmqoq-VL._SL1024_.jpg',
      quantityType: 'Kg'
    },
    {
      productID: '3',
      productName: 'tomato',
      pricePerQuantity: '20',
      category: 'vegetables',
      discountInPercent: '20',
      finalPricePerQty: '100',
      availableQty: '100',
      imgUrl: 'https://m.media-amazon.com/images/I/71DYmqoq-VL._SL1024_.jpg',
      quantityType: 'Kg'
    },

  ];
  constructor(
    private loginSevice: AuthService,
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productID: new FormControl(''),
      productName: new FormControl('', Validators.required),
      pricePerQuantity: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', Validators.required),
      discountInPercent: new FormControl('', Validators.required),
      finalPricePerQty: new FormControl('', Validators.required),
      availableQty: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      quantityType: new FormControl('', Validators.required)
    });


  }

  logOut() {
    this.loginSevice.logOut();
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      console.log(this.productForm.getRawValue());
      alert(JSON.stringify(this.productForm.getRawValue()));
    }
  }

  setFinalPrice() {
    let d = +this.productForm.get('discountInPercent').value;
    let v = +this.productForm.get('pricePerQuantity').value;

    this.productForm.get('finalPricePerQty').setValue(v - (v * (+d / 100)));
  }

  editItem(productId) {
    this.editeProductId = productId;
    let item = this.productList.find(x => x.productID === productId);
    this.productForm.setValue(item)
  }

  openNewItemForm() {
    this.productForm.reset();
    this.isCreateNew = true;
  }

  onCreateNewItem() {
    if (this.productForm.valid) {
      this.productList.push(this.productForm.getRawValue());
      this.isCreateNew = false;
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.productForm.reset();
    this.isCreateNew = false;
    this.editeProductId = '';
  }
}

