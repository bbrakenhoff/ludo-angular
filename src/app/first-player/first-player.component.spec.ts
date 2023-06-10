import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPlayerComponent } from './first-player.component';
import { FirstPlayerService } from './first-player.service';

describe('FirstPlayerComponent', () => {
  let component: FirstPlayerComponent;
  let fixture: ComponentFixture<FirstPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstPlayerComponent],
      providers: [
        {
          provide: FirstPlayerService,
          useValue: jasmine.createSpyObj('FirstPlayerService', [
            'currentPlayerRollDice',
          ]),
        },
      ],
    });
    fixture = TestBed.createComponent(FirstPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
