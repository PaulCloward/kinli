import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiobasinComponent } from './biobasin.component';

describe('BiobasinComponent', () => {
  let component: BiobasinComponent;
  let fixture: ComponentFixture<BiobasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiobasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiobasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
