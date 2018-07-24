import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EntryService} from '../entry.service';

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
    console.log(this._entryService.authenticateUser(username, password));
  }

}
