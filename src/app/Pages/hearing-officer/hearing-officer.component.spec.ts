import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingOfficerComponent } from './hearing-officer.component';

xdescribe('HearingOfficerComponent', () => {
  let component: HearingOfficerComponent;
  let fixture: ComponentFixture<HearingOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HearingOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
