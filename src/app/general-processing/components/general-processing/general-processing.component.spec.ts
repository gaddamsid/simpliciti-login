import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProcessingComponent } from './general-processing.component';

xdescribe('GeneralProcessingComponent', () => {
  let component: GeneralProcessingComponent;
  let fixture: ComponentFixture<GeneralProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
