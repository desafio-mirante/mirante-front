import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneEmailComponent } from './telefone-email.component';

describe('TelefoneEmailComponent', () => {
  let component: TelefoneEmailComponent;
  let fixture: ComponentFixture<TelefoneEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefoneEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefoneEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
