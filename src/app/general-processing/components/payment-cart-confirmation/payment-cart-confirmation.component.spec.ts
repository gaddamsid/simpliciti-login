import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCartConfirmationComponent } from './payment-cart-confirmation.component';

xdescribe('PaymentCartConfirmationComponent', () => {
  let component: PaymentCartConfirmationComponent;
  let fixture: ComponentFixture<PaymentCartConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCartConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCartConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
