import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenciasInfoModalComponent } from './residencias-info-modal.component';

describe('ResidenciasInfoModalComponent', () => {
  let component: ResidenciasInfoModalComponent;
  let fixture: ComponentFixture<ResidenciasInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenciasInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenciasInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
