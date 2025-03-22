import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarforgeSurveySwaggerComponent } from './starforge-survey-swagger.component';

describe('StarforgeSurveySwaggerComponent', () => {
  let component: StarforgeSurveySwaggerComponent;
  let fixture: ComponentFixture<StarforgeSurveySwaggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarforgeSurveySwaggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarforgeSurveySwaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
