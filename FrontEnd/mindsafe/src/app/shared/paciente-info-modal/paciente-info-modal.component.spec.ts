import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInfoModalComponent } from './paciente-info-modal.component';

describe('PacienteInfoModalComponent', () => {
  let component: PacienteInfoModalComponent;
  let fixture: ComponentFixture<PacienteInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
