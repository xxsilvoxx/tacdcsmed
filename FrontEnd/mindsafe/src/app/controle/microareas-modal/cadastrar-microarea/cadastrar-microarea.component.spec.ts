import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMicroareaComponent } from './cadastrar-microarea.component';

describe('CadastrarMicroareaComponent', () => {
  let component: CadastrarMicroareaComponent;
  let fixture: ComponentFixture<CadastrarMicroareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarMicroareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarMicroareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
