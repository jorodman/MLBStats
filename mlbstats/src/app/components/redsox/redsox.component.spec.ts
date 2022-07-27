import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedSoxComponent } from './redsox.component';

describe('RedSoxComponent', () => {
  let component: RedSoxComponent;
  let fixture: ComponentFixture<RedSoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedSoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedSoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
