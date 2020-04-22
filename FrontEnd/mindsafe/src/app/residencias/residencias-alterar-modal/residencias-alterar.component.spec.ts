import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenciasAlterarComponent } from './residencias-alterar.component';

describe('ResidenciasAlterarComponent', () => {
  let component: ResidenciasAlterarComponent;
  let fixture: ComponentFixture<ResidenciasAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenciasAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenciasAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
