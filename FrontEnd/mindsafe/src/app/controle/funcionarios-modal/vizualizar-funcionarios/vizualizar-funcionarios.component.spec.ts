import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarFuncionariosComponent } from './vizualizar-funcionarios.component';

describe('VizualizarFuncionariosComponent', () => {
  let component: VizualizarFuncionariosComponent;
  let fixture: ComponentFixture<VizualizarFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
