import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithLinkComponent } from './login-with-link.component';

describe('LoginWithLinkComponent', () => {
  let component: LoginWithLinkComponent;
  let fixture: ComponentFixture<LoginWithLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
