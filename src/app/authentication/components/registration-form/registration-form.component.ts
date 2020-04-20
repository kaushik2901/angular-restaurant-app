import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserRegistrationModel } from '../../models/userRegistration.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  @Input() isLoading: boolean;
  @Output('submit') submit = new EventEmitter<UserRegistrationModel>();

  public registrationModel: UserRegistrationModel = {
    name: '',
    email: '',
    password: '',
    addressLineOne: '',
    addressLineTwo: '',
    pincode: ''
  };

  constructor() { }

  ngOnInit(): void {

  }

  submitForm(valid: boolean) {
    console.log("value valid", valid);
    
    if(valid == true) {
      console.log("submit registration");    
      this.submit.emit(this.registrationModel);
    }
  }

}
