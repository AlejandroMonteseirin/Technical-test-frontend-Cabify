import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Product } from '../models/product';

import { ShoppingCartRowComponent } from './shopping-cart-row.component';

describe('ShoppingCartRowComponent', () => {
  let component: ShoppingCartRowComponent;
  let fixture: ComponentFixture<ShoppingCartRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartRowComponent ],
      imports: [StoreModule.forRoot({}),FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartRowComponent);
    component = fixture.componentInstance;
    component.product=new Product("MUG", "Cabify Coffee Mug", 5.00, 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
