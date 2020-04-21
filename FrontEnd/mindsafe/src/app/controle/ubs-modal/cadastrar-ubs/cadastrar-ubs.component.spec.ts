import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUbsComponent } from './cadastrar-ubs.component';

describe('CadastrarUbsComponent', () => {
  let component: CadastrarUbsComponent;
  let fixture: ComponentFixture<CadastrarUbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarUbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarUbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
