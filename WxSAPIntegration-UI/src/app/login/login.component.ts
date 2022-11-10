import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDetails = {
    username: "",
    password: ""
  }

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public login() {
    this.userService.login(this.loginDetails.username, this.loginDetails.password).subscribe({next: (resp: string) => {
      this.router.navigate(['/']);
    }, error: (error: HttpErrorResponse) => {
      if(error.status === 401) {
        this.messageService.errorMessage("Invalid credentials.");
      } else {
        this.messageService.errorMessage(error.error.message);
      }
    }});
  }

}
