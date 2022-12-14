import { Component, OnInit } from '@angular/core';
import { DeveloperService, OpenAPIDocumentationResponse } from '../services/developer.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-openapi',
  templateUrl: './openapi.component.html',
  styleUrls: ['./openapi.component.css']
})
export class OpenAPIComponent implements OnInit {

  public openAPIContent: string = "";

  constructor(private developerService: DeveloperService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.developerService.getOpenAPIDocumentation().subscribe({ next: (resp: OpenAPIDocumentationResponse) => {
      this.openAPIContent = resp.response.content;
    }});
  }

  public copyToClipboard(inputElement: HTMLTextAreaElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.messageService.successMessage("Copied to clipboard.");
  }

}
