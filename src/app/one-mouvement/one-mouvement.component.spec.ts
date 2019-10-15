import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMouvementComponent } from './one-mouvement.component';

describe('OneMouvementComponent', () => {
  let component: OneMouvementComponent;
  let fixture: ComponentFixture<OneMouvementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneMouvementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
