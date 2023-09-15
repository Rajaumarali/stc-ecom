import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDialogComponent } from './product-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDialogComponent],
      imports: [HttpClientTestingModule,MatDialogModule,MatSelectModule,MatIconModule,MatSnackBarModule,MatFormFieldModule,MatPaginatorModule,MatInputModule,BrowserAnimationsModule], // Include MatDialogModule here
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {} // Mock MatDialogRef as an empty object
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} // Mock MAT_DIALOG_DATA as an empty object or provide your test data here
        }
      ]
    });
    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
