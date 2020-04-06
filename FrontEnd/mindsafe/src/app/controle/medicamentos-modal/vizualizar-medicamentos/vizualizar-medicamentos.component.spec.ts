import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarMedicamentosComponent } from './vizualizar-medicamentos.component';

describe('VizualizarMedicamentosComponent', () => {
  let component: VizualizarMedicamentosComponent;
  let fixture: ComponentFixture<VizualizarMedicamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarMedicamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
