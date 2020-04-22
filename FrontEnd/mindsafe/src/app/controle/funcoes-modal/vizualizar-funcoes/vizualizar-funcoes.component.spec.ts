import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarFuncoesComponent } from './vizualizar-funcoes.component';

describe('VizualizarFuncoesComponent', () => {
  let component: VizualizarFuncoesComponent;
  let fixture: ComponentFixture<VizualizarFuncoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarFuncoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarFuncoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
