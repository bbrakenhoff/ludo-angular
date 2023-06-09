import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPlayerComponent } from './first-player.component';

describe('FirstPlayerComponent', () => {
  let component: FirstPlayerComponent;
  let fixture: ComponentFixture<FirstPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstPlayerComponent]
    });
    fixture = TestBed.createComponent(FirstPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
