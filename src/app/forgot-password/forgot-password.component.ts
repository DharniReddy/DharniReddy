import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../shared/password-validator';
import { ToasterService } from '../toaster.service';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any;

  constructor(private fb:FormBuilder,private service:UserRegistrationService,private router:Router,private toast:ToasterService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email :['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',Validators.required]
    },{validator:passwordValidator});
  }
  onSubmit(){
    if (this.forgotPasswordForm.valid) {
        let resp =this.service.forgotPassword(this.forgotPasswordForm.value);
        resp.subscribe(
          (response: any) => {
            if(response == "Password updated successfully"){
              this.toast.showSuccess(response)
              this.router.navigate(['/login'])
            }
            else{
              this.toast.showWarning(response)
            }
          },
          (error: any) => this.toast.showError(error)
        );
    } else {
      Object.keys(this.forgotPasswordForm.controls).forEach(field => {
        const control = this.forgotPasswordForm.get(field);
        control.markAsTouched({ onlySelf: true }); 
      });
    } 
  }
}

