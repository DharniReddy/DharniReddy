import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster.service';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm :any;
  message:any;
  userDetailes:any;
  localObj:any;
  userEmail:any;
  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email :['',Validators.required],
      password:['',Validators.required],
    });
  }
  onSubmit(){ 
    if (this.loginForm.valid) {    
      console.log(this.loginForm.value);
      let resp =this.service.checkLoginCredentials(this.loginForm.value)
      resp.subscribe(
        (response: any) => {
              if(response== '1'){
                let myObj = this.loginForm.value;
                localStorage.setItem('user', JSON.stringify(myObj));  
                this.localObj = localStorage.getItem('user')
                this.userEmail = JSON.parse(this.localObj);
                let res=this.service.getUserByEmail(this.userEmail['email'])
                res.subscribe(
                  (data:any)=>            
                    localStorage.setItem('userDetailes', JSON.stringify(data))
                  );
                this.toast.showSuccess("Successfully logged in");
                this.router.navigate(['/dashboard'])
                }
                else{
                  this.toast.showWarning(response);
                }
              },
              (error: any) => this.toast.showError(error)
      ); 
  }
  else {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);       
      control.markAsTouched({ onlySelf: true });      
    });
  }
  }
}
