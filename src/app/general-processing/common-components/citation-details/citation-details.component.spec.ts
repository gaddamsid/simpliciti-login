import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationDetailsComponent } from './citation-details.component';

xdescribe('CitationDetailsComponent', () => {
  let component: CitationDetailsComponent;
  let fixture: ComponentFixture<CitationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
