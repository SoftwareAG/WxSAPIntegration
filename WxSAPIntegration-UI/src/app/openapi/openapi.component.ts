import { Component, OnInit } from '@angular/core';
import { DeveloperService, OpenAPIDocumentationResponse } from '../services/developer.service';

@Component({
  selector: 'app-openapi',
  templateUrl: './openapi.component.html',
  styleUrls: ['./openapi.component.css']
})
export class OpenAPIComponent implements OnInit {

  public openAPIContent: string = "";

  constructor(private developerService: DeveloperService) { }

  ngOnInit(): void {
    this.developerService.getOpenAPIDocumentation().subscribe({ next: (resp: OpenAPIDocumentationResponse) => {
      this.openAPIContent = resp.response.content;
    }});
  }

}
