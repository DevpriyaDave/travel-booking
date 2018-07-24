import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private _loginURL = 'http://127.0.0.1:5000/login';
  private _registerURL = 'localhost:5000/register';
  private _loginDetails;

  constructor(private http: HttpClient) { }

  authenticateUser(username, password) {
    console.log(username);
    console.log(password);
    let header: HttpHeaders = new HttpHeaders();
    header.append('Content-type', 'application/json');
    this._loginDetails = {"username": username, "password": password};
    this.http.post(this._loginURL, this._loginDetails, {headers: header})
      .subscribe((response: Response) => {
      console.log(response.headers);
    });
  }

  registerUser() {

  }
}
