import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosFamiliaModalComponent } from './dados-familia-modal.component';

describe('DadosFamiliaModalComponent', () => {
  let component: DadosFamiliaModalComponent;
  let fixture: ComponentFixture<DadosFamiliaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosFamiliaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosFamiliaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
