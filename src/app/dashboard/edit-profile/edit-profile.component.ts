import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/toaster.service';
import { UserRegistrationService } from 'src/app/user-registration.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateProfileForm: any;
  userObj: any;
  useriditem: any;
  userId: any;
  profileDetails:any;
  imageName:any;
  userName:any;
  
  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {
    this.profileDetails =this.service.profileDetails;
    this.imageName = this.service.imageName;
    if(this.imageName==null){
      this.imageName = "profile.png";
    }
    else if(!this.imageName){
      this.imageName = "profile.png";
    }
    else{
      this.imageName = this.service.imageName;
    }
    this.userName = this.profileDetails[0]['username'];
    this.updateProfileForm = this.fb.group({
      username :['',[Validators.required,Validators.pattern("^[a-zA-Z. ]*[a-zA-Z]*"),Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      mobilenumber:['',[Validators.required,Validators.pattern("[6-9]{1}[0-9]{9}")]],
      dob:[''],
      profilePic:['']
      });
  }
  updateProfile(){
    this.userObj = localStorage.getItem('userDetailes');
    this.useriditem = JSON.parse(this.userObj);
    this.userId =this.useriditem[0]['uid'];
    let resp=this.service.updateUserProfile(this.updateProfileForm.value,this.userId);
    resp.subscribe(
      (response: any) =>this.toast.showSuccess(response),
         (error: any) => this.toast.showError(error)
       );
  }

}
