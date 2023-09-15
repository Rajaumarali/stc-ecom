import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  products: Product[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'category', 'description', 'image', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  nextProductId = 1;

  constructor(private productService: ProductService, private authService: AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    // Fetch the products list when the component initializes.
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      // Assign the fetched data to the MatTableDataSource
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: ''
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        // Set the ID of the new product to 1
        result.id = 1;

        // Reset the IDs for all existing products
        this.dataSource.data.forEach((product, index) => {
          product.id = index + 2; // Increment existing IDs
        });

        // Add the new product to the top of the data source
        this.dataSource.data.unshift(result);

        this.dataSource.data = [...this.dataSource.data];
      }
    });

  }

  editProduct(productData: Product, i: number) {
    // edit product using dialog box
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: productData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data[i] = result;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  deleteProduct(productId: number, i: number) {
    // delete a product from the product list
    this.productService.deleteProduct(productId).subscribe((data: any) => {
      this.dataSource.data.splice(i, 1);
      this.dataSource.data = [...this.dataSource.data];
      this._snackBar.open(`Product ID ${productId} deleted successfully`, 'X');
    });

  }

  applyFilter(event: Event) {
    //apply filter on product list item
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout() {
    this.authService.logout();
  }

  openSnackBar(message: string, action: string) {
    // show the snackbar for user information
    this._snackBar.open(message, action);
  }
}
