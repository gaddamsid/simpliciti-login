import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticingComponent } from './noticing.component';

xdescribe('NoticingComponent', () => {
  let component: NoticingComponent;
  let fixture: ComponentFixture<NoticingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
