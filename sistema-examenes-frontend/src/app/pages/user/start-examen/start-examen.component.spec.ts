import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExamenComponent } from './start-examen.component';

describe('StartExamenComponent', () => {
  let component: StartExamenComponent;
  let fixture: ComponentFixture<StartExamenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartExamenComponent]
    });
    fixture = TestBed.createComponent(StartExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
