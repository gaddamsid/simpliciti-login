import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeSearchComponent } from './notice-search.component';

xdescribe('NoticeSearchComponent', () => {
  let component: NoticeSearchComponent;
  let fixture: ComponentFixture<NoticeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
