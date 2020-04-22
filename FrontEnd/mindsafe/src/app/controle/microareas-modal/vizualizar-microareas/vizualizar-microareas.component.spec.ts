import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarMicroareasComponent } from './vizualizar-microareas.component';

describe('VizualizarMicroareasComponent', () => {
  let component: VizualizarMicroareasComponent;
  let fixture: ComponentFixture<VizualizarMicroareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarMicroareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarMicroareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
