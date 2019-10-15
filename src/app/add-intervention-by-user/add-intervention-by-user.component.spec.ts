import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventionByUserComponent } from './add-intervention-by-user.component';

describe('AddInterventionByUserComponent', () => {
  let component: AddInterventionByUserComponent;
  let fixture: ComponentFixture<AddInterventionByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterventionByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventionByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
