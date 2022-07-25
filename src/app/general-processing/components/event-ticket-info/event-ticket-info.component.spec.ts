import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTicketInfoComponent } from './event-ticket-info.component';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';

xdescribe('EventTicketInfoComponent', () => {
  let component: EventTicketInfoComponent;
  let fixture: ComponentFixture<EventTicketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTicketInfoComponent,NgxGalleryOptions ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
