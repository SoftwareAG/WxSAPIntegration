import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messageSubject = new Subject<Message>();

  constructor() { }

  public errorMessage(message: string): void {
    this.messageSubject.next({
      type: "error",
      text: message
    });
  }

  public successMessage(message: string): void {
    this.messageSubject.next({
      type: "success",
      text: message
    });
  }

}

export interface Message {
  type: string;
  text: string;
}
