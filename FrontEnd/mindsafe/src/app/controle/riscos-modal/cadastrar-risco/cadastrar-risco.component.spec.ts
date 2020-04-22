import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarRiscoComponent } from './cadastrar-risco.component';

describe('CadastrarRiscoComponent', () => {
  let component: CadastrarRiscoComponent;
  let fixture: ComponentFixture<CadastrarRiscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarRiscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarRiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
