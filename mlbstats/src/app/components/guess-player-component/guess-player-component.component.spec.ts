import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessPlayerComponentComponent } from './guess-player-component.component';

describe('GuessPlayerComponentComponent', () => {
  let component: GuessPlayerComponentComponent;
  let fixture: ComponentFixture<GuessPlayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessPlayerComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
