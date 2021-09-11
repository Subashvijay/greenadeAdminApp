import { HttpClient } from '@angular/common/http';
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
  productList: ProductItems[] = [];
  constructor(
    private loginSevice: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      productName: new FormControl('', Validators.required),
      pricePerQuantity: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', Validators.required),
      discountInPercent: new FormControl('', Validators.required),
      finalPricePerQty: new FormControl('', Validators.required),
      availableQty: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      quantityType: new FormControl('', Validators.required),
      minimumQuantity: new FormControl('', Validators.required)
    });
    this.fetchProfuctList();
  }

  fetchProfuctList() {
    this.http.get<ProductItems[]>('https://greenade-admin.herokuapp.com/api/ProductItem').subscribe(x => this.productList = x);
  }
  updateProduct(product: ProductItems) {
    this.http.put<ProductItems>('https://greenade-admin.herokuapp.com/api/ProductItem', product)
      .subscribe(x => { alert('updated'), this.fetchProfuctList() }, err => alert(err));
  }

  addProduct(product: ProductItems) {
    this.http.post<ProductItems>('https://greenade-admin.herokuapp.com/api/ProductItem', product)
      .subscribe(x => { alert('added'), this.fetchProfuctList() }, err => alert(err));
  }

  deleteProduct(id: string) {
    this.http.delete<ProductItems>('https://greenade-admin.herokuapp.com/api/ProductItem/' + id)
      .subscribe(x => { alert('deleted'), this.fetchProfuctList() }, err => alert(err));
  }

  logOut() {
    this.loginSevice.logOut();
  }

  onEdit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      const product = this.generatePayload();
      product.id = this.editeProductId;
      this.updateProduct(product);
      this.editeProductId = '';
    }
  }

  onDelete() {

  }

  setFinalPrice(): void {
    let d = +this.productForm.get('discountInPercent').value;
    let v = +this.productForm.get('pricePerQuantity').value;

    this.productForm.get('finalPricePerQty').setValue(v - (v * (+d / 100)));
  }

  editItem(productId): void {
    this.editeProductId = productId;
    this.isCreateNew = false;
    const item = this.productList.find(x => x.id === productId);
    this.productForm.setValue(item);
  }

  openNewItemForm(): void {
    this.productForm.reset();
    this.isCreateNew = true;
    this.editeProductId = '';
  }

  generatePayload(): ProductItems {
    return {
      productName: this.productForm.get('productName').value,
      pricePerQuantity: this.productForm.get('pricePerQuantity').value,
      quantityType: this.productForm.get('quantityType').value,
      discountInPercent: this.productForm.get('discountInPercent').value,
      finalPricePerQty: this.productForm.get('finalPricePerQty').value,
      availableQty: this.productForm.get('availableQty').value,
      category: this.productForm.get('category').value,
      imgUrl: this.productForm.get('imgUrl').value,
      minimumQuantity: this.productForm.get('minimumQuantity').value,
    } as ProductItems;
  }

  onCreateNewItem(): void {
    if (this.productForm.valid) {
      this.addProduct(this.generatePayload());
      this.isCreateNew = false;
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.productForm.reset();
    this.isCreateNew = false;
    this.editeProductId = '';
  }
}

