import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarFamiliaModalComponent } from './alterar-familia-modal.component';

describe('AlterarFamiliaModalComponent', () => {
  let component: AlterarFamiliaModalComponent;
  let fixture: ComponentFixture<AlterarFamiliaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarFamiliaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarFamiliaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
