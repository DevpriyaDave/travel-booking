import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EntryService} from '../entry.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _entryService: EntryService) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(username, password) {
    this._entryService.authenticateUser(username, password).subscribe((response: HttpResponse<any>) => {
      console.log(response.status);
      console.log(response.body);
    });
  }

}
