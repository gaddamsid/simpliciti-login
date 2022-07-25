import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormRenderComponent } from './dynamic-form-render.component';

xdescribe('DynamicFormRenderComponent', () => {
  let component: DynamicFormRenderComponent;
  let fixture: ComponentFixture<DynamicFormRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
