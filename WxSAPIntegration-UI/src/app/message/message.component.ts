import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.messageSubject.subscribe((message: Message) => {
      let updatedArrayLength = this.messages.push(message);
      setTimeout(() => {
        this.closeMessage(updatedArrayLength - 1);
      }, 3000);
    });
  }

  public closeMessage(index: number): void {
    this.messages[index] = {
      text: "",
      type: ""
    };
  }

}
