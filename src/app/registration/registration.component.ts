import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/password-validator';
import { forbiddenNameValidator } from '../shared/user-name.validator';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm :any;
  constructor(private fb:FormBuilder,private service:UserRegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username :['',[Validators.required,Validators.pattern("^[a-zA-Z. ]*[a-zA-Z]*"),Validators.minLength(3),forbiddenNameValidator(/password/)]],
      password:['',[Validators.minLength(8),Validators.required]],
      confirmPassword:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mobilenumber:['',[Validators.required,Validators.pattern("[6-9]{1}[0-9]{9}")]]
    },{validator:passwordValidator});
  }


  onSubmit(){

    if (this.registrationForm.valid) {
      console.log('form submitted');
      console.log(this.registrationForm.value);
  let resp =this.service.doRegistration(this.registrationForm.value);
  resp.subscribe(
    (response: any) => window.alert(response),
    (error: any) => console.log('error',error)
  );
    } else {
      Object.keys(this.registrationForm.controls).forEach(field => { // {1}
        const control = this.registrationForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
}
}
