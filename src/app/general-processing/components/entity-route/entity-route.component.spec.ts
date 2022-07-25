import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRouteComponent } from './entity-route.component';

xdescribe('EntityRouteComponent', () => {
  let component: EntityRouteComponent;
  let fixture: ComponentFixture<EntityRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
