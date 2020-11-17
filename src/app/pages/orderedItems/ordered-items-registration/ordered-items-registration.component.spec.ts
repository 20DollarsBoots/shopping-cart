import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedItemsRegistrationComponent } from './ordered-items-registration.component';

describe('OrderedItemsRegistrationComponent', () => {
  let component: OrderedItemsRegistrationComponent;
  let fixture: ComponentFixture<OrderedItemsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedItemsRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedItemsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
