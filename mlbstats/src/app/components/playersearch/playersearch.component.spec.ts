import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersearchComponent } from './playersearch.component';

describe('PlayersearchComponent', () => {
  let component: PlayersearchComponent;
  let fixture: ComponentFixture<PlayersearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
