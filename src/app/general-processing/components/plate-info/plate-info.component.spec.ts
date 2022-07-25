import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateInfoComponent } from './plate-info.component';

xdescribe('PlateInfoComponent', () => {
  let component: PlateInfoComponent;
  let fixture: ComponentFixture<PlateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
