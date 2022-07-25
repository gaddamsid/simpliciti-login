import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormRenderColumnComponent } from './dynamic-form-render-column.component';

xdescribe('DynamicFormRenderColumnComponent', () => {
  let component: DynamicFormRenderColumnComponent;
  let fixture: ComponentFixture<DynamicFormRenderColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormRenderColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormRenderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
