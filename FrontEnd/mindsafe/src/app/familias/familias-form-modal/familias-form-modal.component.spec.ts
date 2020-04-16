import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliasFormModalComponent } from './familias-form-modal.component';

describe('FamiliasFormModalComponent', () => {
  let component: FamiliasFormModalComponent;
  let fixture: ComponentFixture<FamiliasFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliasFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliasFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
