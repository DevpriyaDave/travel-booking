import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EntryService} from '../entry.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _entryService: EntryService) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      reenter_password: []
    });
  }

  onSubmit() {
    console.log(this._entryService.registerUser());
  }

}
