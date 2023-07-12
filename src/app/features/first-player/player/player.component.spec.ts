import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSpy, createPlayerSpy } from 'src/app/shared/models/player.spy';
import { LudoColorPipe } from 'src/app/shared/pipes/ludo-color.pipe';
import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  let playerSpy: PlayerSpy;

  beforeEach(() => {
    playerSpy = createPlayerSpy();

    TestBed.configureTestingModule({
      declarations: [PlayerComponent, LudoColorPipe]
    });
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.player = playerSpy.player;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
