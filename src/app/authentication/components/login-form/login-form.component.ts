import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginCredential } from '../../models/loginCredential.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() isLoading: boolean;
  @Output('submit') submit = new EventEmitter<{ loginType: string, data: LoginCredential}>();

  public credentialModel: LoginCredential = {
    email: '',
    password: '',
  };

  public nextClicked = false;

  constructor() { }

  ngOnInit(): void {

  }

  submitForm() {
    if (this.nextClicked) {
      this.submit.emit({
        loginType: 'user',
        data: Object.assign({}, this.credentialModel),
      });
    } else {
      this.submit.emit({
        loginType: 'staff',
        data: Object.assign({}, this.credentialModel),
      });
    }
  }

  userClicked() {
    this.nextClicked = true;
    this.submitForm();
  }

  staffClicked() {
    this.nextClicked = false;
    this.submitForm();
  }

}
