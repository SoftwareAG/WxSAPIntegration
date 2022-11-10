import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public logout() {
    this.userService.logout().subscribe({next: (resp: string) => {
      this.messageService.errorMessage("Your session has expired.");
      this.router.navigate(['/login']);
    }, error: (error: HttpErrorResponse) => {
      this.messageService.errorMessage(error.error.message);
    }})
  }

}
