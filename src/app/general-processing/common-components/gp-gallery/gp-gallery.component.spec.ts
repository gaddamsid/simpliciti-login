import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpGalleryComponent } from './gp-gallery.component';

xdescribe('GpGalleryComponent', () => {
  let component: GpGalleryComponent;
  let fixture: ComponentFixture<GpGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
