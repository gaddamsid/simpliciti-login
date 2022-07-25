import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHearingComponent } from './schedule-hearing.component';

xdescribe('ScheduleHearingComponent', () => {
  let component: ScheduleHearingComponent;
  let fixture: ComponentFixture<ScheduleHearingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleHearingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
