import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarUbsComponent } from './vizualizar-ubs.component';

describe('VizualizarUbsComponent', () => {
  let component: VizualizarUbsComponent;
  let fixture: ComponentFixture<VizualizarUbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarUbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarUbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
