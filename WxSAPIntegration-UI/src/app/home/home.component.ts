import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KafkaConnectionStateResponse, KafkaConnectionService, KafkaConnectionState } from '../services/kafka-connection.service';
import { MessageService } from '../services/message.service';
import { SapConnectionService, SAPConnectionState, SAPConnectionStateResponse } from '../services/sap-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public sapConnectionState: boolean = false;

  public kafkaConnectionState: KafkaConnectionState = {
    state: "disabled"
  };

  constructor(private kafkaConnectionService: KafkaConnectionService, private sapConnectionService: SapConnectionService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.sapConnectionService.getConnectionState().subscribe({ next: (resp: SAPConnectionStateResponse) => {
      let sapConnectionState: SAPConnectionState = resp.response;
      if(sapConnectionState.state === "enabled") {
        this.sapConnectionState = true;
      } else {
        this.sapConnectionState = false;
      }
    }, error: (error: HttpErrorResponse) => {
      if(error.status === 401) {
        this.router.navigate(['/login']);
        this.messageService.errorMessage("Your session has expired.");
      } else {
        this.messageService.errorMessage(error.error.message);
      }
      
    }});

    /*this.kafkaConnectionService.getConnectionState().subscribe({ next: (resp: KafkaConnectionStateResponse) => {
      this.kafkaConnectionState = resp.response;
    }, error: (error: HttpErrorResponse) => {
      this.messageService.errorMessage(error.error.message);
    }});*/
  }

  public toggleSAPConnectionState() {
    if(this.sapConnectionState) {
      this.sapConnectionService.updateConnectionState("enable").subscribe({ next: (resp: any) => {
        this.sapConnectionState = true;
        this.messageService.successMessage("SAP Connection enabled.")
      }, error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
          this.messageService.errorMessage("Your session has expired.");
        } else {
          this.sapConnectionState = false;
          this.messageService.errorMessage(error.error.message);
        }
      }});
    } else {
      this.sapConnectionService.updateConnectionState("disable").subscribe({ next: (resp: any) => {
        this.sapConnectionState = false;
        this.messageService.successMessage("SAP Connection disabled.")
      }, error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
          this.messageService.errorMessage("Your session has expired.");
        } else {
          this.sapConnectionState = true;
          this.messageService.errorMessage(error.error.message);
        }
      }});
    }
  }

  public toggleKafkaConnectionState() {
    if(this.kafkaConnectionState.state === "disabled") {
      this.kafkaConnectionService.updateConnectionState("enable").subscribe({ next: (resp) => {
        this.kafkaConnectionState.state = "enabled";
        this.messageService.successMessage("Kafka Connection enabled.");
      }, error: (error: HttpErrorResponse) => {
        this.messageService.errorMessage(error.message);
      }});
    } else {
      this.kafkaConnectionService.updateConnectionState("disable").subscribe({ next: (resp) => {
        this.kafkaConnectionState.state = "disabled";
        this.messageService.successMessage("Kafka Connection disabled.");
      }, error: (error: HttpErrorResponse) => {
        this.messageService.errorMessage(error.message);
      }});
    }
  }

}
