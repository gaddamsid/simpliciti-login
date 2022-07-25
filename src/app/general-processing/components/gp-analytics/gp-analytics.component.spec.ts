import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpAnalyticsComponent } from './gp-analytics.component';

xdescribe('GpAnalyticsComponent', () => {
  let component: GpAnalyticsComponent;
  let fixture: ComponentFixture<GpAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
