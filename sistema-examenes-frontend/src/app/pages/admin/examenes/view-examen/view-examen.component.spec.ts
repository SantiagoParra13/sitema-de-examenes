import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamenComponent } from './view-examen.component';

describe('ViewExamenComponent', () => {
  let component: ViewExamenComponent;
  let fixture: ComponentFixture<ViewExamenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExamenComponent]
    });
    fixture = TestBed.createComponent(ViewExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
