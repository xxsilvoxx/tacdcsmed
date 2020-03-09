import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesAlterarComponent } from './pacientes-alterar.component';

describe('PacientesAlterarComponent', () => {
  let component: PacientesAlterarComponent;
  let fixture: ComponentFixture<PacientesAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
