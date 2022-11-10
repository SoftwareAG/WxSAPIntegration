import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<string> {
    let loginRequest = {
      username: username,
      password: password
    };
    return this.http.post<string>("/invoke/wm.server/login", loginRequest);
  }

  public logout(): Observable<string> {
    let logoutRequest = {};
    return this.http.post<string>("/invoke/wm.server/logout", logoutRequest);
  }

}
