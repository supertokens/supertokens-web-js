import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCodeComponent } from './login-code.component';

describe('LoginCodeComponent', () => {
  let component: LoginCodeComponent;
  let fixture: ComponentFixture<LoginCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
