import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContaModalComponent } from './recuperar-conta-modal.component';

describe('RecuperarContaModalComponent', () => {
  let component: RecuperarContaModalComponent;
  let fixture: ComponentFixture<RecuperarContaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
