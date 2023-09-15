import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  formData: any = [];
  categories: ProductCategory[] = [];
  loading: boolean = false;
  buttonDisabled = true;
  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>, public productService: ProductService, private snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    // fetch the product Categories
    this.getCategories();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  // check form fields for validation
  checkFormFields() {
    this.buttonDisabled = !(this.formData.title && this.formData.price && this.formData.description && this.formData.image && this.formData.category);
  }

  createProduct() {
    this.loading = true;
    //setTimeout added just to show the spinner
    setTimeout(() => {
      this.productService.addProduct(this.formData).subscribe((resp: any) => {
        this.dialogRef.close(resp);
        this.snackBar.open('Product Created successfully', 'X', { duration: 1500 });
      });
    }, 1000);
  }

  updateProduct() {
    this.loading = true;
    //setTimeout added just to show the spinner
    setTimeout(() => {
      this.productService.updateProduct(this.formData).subscribe((resp: any) => {
        this.dialogRef.close(resp);
        this.snackBar.open('Product Update successfully', 'X', { duration: 1500 });
      });
    }, 1000)
  }

  getCategories() {
    this.productService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
      this.bindDialogData();
    });
  }

  // bind the date in mat-dialog-content
  bindDialogData() {
    if (this.data) {
      this.formData = {
        id: this.data.id,
        title: this.data.title,
        image: this.data.image,
        category: this.data.category,
        price: this.data.price,
        description: this.data.description,
      }
    } else {
      this.formData = {
        id: 0,
        title: null,
        image: null,
        category: null,
        price: null,
        description: null,
      }
    }
  }
}
