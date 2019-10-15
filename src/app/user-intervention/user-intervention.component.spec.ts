import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterventionComponent } from './user-intervention.component';

describe('UserInterventionComponent', () => {
  let component: UserInterventionComponent;
  let fixture: ComponentFixture<UserInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
