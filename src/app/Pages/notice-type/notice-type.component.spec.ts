import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeTypeComponent } from './notice-type.component';

xdescribe('NoticeTypeComponent', () => {
  let component: NoticeTypeComponent;
  let fixture: ComponentFixture<NoticeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
