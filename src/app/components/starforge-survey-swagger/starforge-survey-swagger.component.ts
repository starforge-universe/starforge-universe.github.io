import { Component, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-starforge-survey-swagger',
  templateUrl: './starforge-survey-swagger.component.html',
  styleUrl: './starforge-survey-swagger.component.scss',
  standalone: true
})
export class StarforgeSurveySwaggerComponent implements AfterContentInit {
  @ViewChild('swaggerui',{static: true})
  swaggerUiDocElement: ElementRef | undefined

  ngAfterContentInit(): void {
    SwaggerUI({
      url: 'https://petstore.swagger.io/v2/swagger.json',
      domNode: this.swaggerUiDocElement?.nativeElement,
    })
  }

}
