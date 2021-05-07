import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../shared/password-validator';
import { forbiddenNameValidator } from '../shared/user-name.validator';
import { ToasterService } from '../toaster.service';
import { UserRegistrationService } from '../user-registration.service';
import { UsernameValidator } from './userNameValidation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registrationForm :any;
message:any;
  constructor(private fb:FormBuilder,private service:UserRegistrationService,private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username :['',[Validators.required,Validators.pattern("^[a-zA-Z. ]*[a-zA-Z]*"),Validators.minLength(3),forbiddenNameValidator(/password/),UsernameValidator.cannotContainSpace]],
      password:['',[Validators.minLength(8),Validators.required]],
      confirmPassword:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mobilenumber:['',[Validators.required,Validators.pattern("[6-9]{1}[0-9]{9}")]],
      dob:['',Validators.required]
    },{validator:passwordValidator});
  }
  onSubmit(){
    if (this.registrationForm.valid) {
      let resp =this.service.doRegistration(this.registrationForm.value);
      resp.subscribe(
        (response: any) =>{
          if(response == "Successfully Registered"){
            this.toast.showSuccess(response);
            let res=this.service.getUserByEmail(this.registrationForm.value.email)
            res.subscribe(
              (data:any)=>{
                 localStorage.setItem('userDetailes', JSON.stringify(data))
              }
              );
               this.router.navigate(['/card'])
          }
          else if(response =="UserName already exist"){
            this.toast.showWarning(response);
          }
        },
        (error: any) =>this.toast.showError(error)
      );
    } else {
      Object.keys(this.registrationForm.controls).forEach(field => {
        const control = this.registrationForm.get(field);
        control.markAsTouched({ onlySelf: true }); 
      });
    }
  }

}
