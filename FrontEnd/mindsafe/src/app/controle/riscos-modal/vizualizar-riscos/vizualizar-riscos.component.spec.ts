import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarRiscosComponent } from './vizualizar-riscos.component';

describe('VizualizarRiscosComponent', () => {
  let component: VizualizarRiscosComponent;
  let fixture: ComponentFixture<VizualizarRiscosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarRiscosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarRiscosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
