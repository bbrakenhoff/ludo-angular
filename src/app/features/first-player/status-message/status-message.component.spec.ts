import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMessageComponent } from './status-message.component';

describe('StatusMessageComponent', () => {
  let component: StatusMessageComponent;
  let fixture: ComponentFixture<StatusMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusMessageComponent]
    });
    fixture = TestBed.createComponent(StatusMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
