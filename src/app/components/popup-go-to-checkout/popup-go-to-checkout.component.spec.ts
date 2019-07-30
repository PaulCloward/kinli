import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGoToCheckoutComponent } from './popup-go-to-checkout.component';

describe('PopupGoToCheckoutComponent', () => {
  let component: PopupGoToCheckoutComponent;
  let fixture: ComponentFixture<PopupGoToCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupGoToCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGoToCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
