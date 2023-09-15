import { Component, HostListener } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  categories: ProductCategory[] = [];
  products: Product[] = [];
  productList: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = false;
  isFiltered = false;
  defaultCategory: String = 'All Products';
  initialLoadCount = 10;
  loadMoreCount = 10;


  // Scroll event listener
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
      // on scroll get the window height
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY + windowHeight >= document.body.scrollHeight) {
        // Load more products when scrolling down
        this.loadMoreProducts();
      }
  }



  constructor(private authService: AuthService, private productService:ProductService) { }

  ngOnInit() {
    // get product categories from API endpoint
    this.getProductsCategories();
  }

  getProductsCategories(){
    this.productService.getCategories().subscribe((categories:any) => {
      this.categories = categories;
      this.getProductsList();
    });
  }

  getProductsList(){
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.productList = this.products.slice(0, this.initialLoadCount);
      this.loading = false;
    });
  }

  filterProductsListByCategory(category:any) {
    this.loading = true;
    this.productList = [];
    this.defaultCategory = category;
    // Filter products by the selected category
    this.filteredProducts = this.products.filter(product => product.category === category);
    this.isFiltered = true;

    setTimeout(() => {
      this.productList = this.filteredProducts.slice(0, this.initialLoadCount); // Load initial products
      // Clear the loading flag when filtering is done
      this.loading = false;
    }, 1000);
  }

  loadMoreProducts() {
    // Check if there are more products to load based on the current state
    if (this.isFiltered) {
      // In filtered state, load more from filtered products
      const startIndex = this.productList.length;
      const endIndex = startIndex + this.loadMoreCount;
      this.productList = this.productList.concat(this.filteredProducts.slice(startIndex, endIndex));
    } else {
      // In unfiltered state, load more from all products
      const startIndex = this.productList.length;
      const endIndex = startIndex + this.loadMoreCount;
      this.productList = this.productList.concat(this.products.slice(startIndex, endIndex));
    }
  }

  resetProductList() {
    this.defaultCategory = 'All Products';
    this.productList = [];
    this.loading = true;
    setTimeout(() => {
      this.productList = this.products;
      this.loading = false;
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }
}
