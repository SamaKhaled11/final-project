import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOfBrandComponent } from './products-of-brand.component';

describe('ProductsOfBrandComponent', () => {
  let component: ProductsOfBrandComponent;
  let fixture: ComponentFixture<ProductsOfBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsOfBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsOfBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
