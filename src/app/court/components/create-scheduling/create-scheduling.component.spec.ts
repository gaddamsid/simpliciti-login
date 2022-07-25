import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchedulingComponent } from './create-scheduling.component';

xdescribe('CreateSchedulingComponent', () => {
  let component: CreateSchedulingComponent;
  let fixture: ComponentFixture<CreateSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
