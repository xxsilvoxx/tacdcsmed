import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenciasFormComponent } from './residencias-form.component';

describe('ResidenciasFormComponent', () => {
  let component: ResidenciasFormComponent;
  let fixture: ComponentFixture<ResidenciasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenciasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
