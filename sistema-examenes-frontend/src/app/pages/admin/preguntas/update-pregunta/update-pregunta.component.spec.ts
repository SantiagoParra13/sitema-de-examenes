import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreguntaComponent } from './update-pregunta.component';

describe('UpdatePreguntaComponent', () => {
  let component: UpdatePreguntaComponent;
  let fixture: ComponentFixture<UpdatePreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePreguntaComponent]
    });
    fixture = TestBed.createComponent(UpdatePreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
