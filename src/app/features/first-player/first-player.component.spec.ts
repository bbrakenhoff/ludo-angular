import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPlayerComponent } from './first-player.component';
import { FirstPlayerService } from './first-player.service';
import { LudoColorPipe } from '../../shared/pipes/ludo-color.pipe';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FirstPlayerComponent', () => {
  let component: FirstPlayerComponent;
  let fixture: ComponentFixture<FirstPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FirstPlayerComponent],
      providers: [
        {
          provide: FirstPlayerService,
          useValue: jasmine.createSpyObj(
            'FirstPlayerService',
            ['currentPlayerRollDice'],
            { firstPlayerIndex$: of() }
          ),
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
