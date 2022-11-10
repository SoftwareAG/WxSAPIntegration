import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) { }

  public getOpenAPIDocumentation(): Observable<OpenAPIDocumentationResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        "X-wM-AdminUI": "true"
      })
    };
    return this.http.get<OpenAPIDocumentationResponse>("/wxsapintegration/config/developer/openapi", httpOptions);
  }

}

export interface OpenAPIDocumentationResponse {
  response: {
    content: string
  },
  message: string
}
