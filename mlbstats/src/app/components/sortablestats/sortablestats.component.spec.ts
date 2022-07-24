import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortablestatsComponent } from './sortablestats.component';

describe('SortablestatsComponent', () => {
  let component: SortablestatsComponent;
  let fixture: ComponentFixture<SortablestatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortablestatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortablestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
