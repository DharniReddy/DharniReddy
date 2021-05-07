import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/toaster.service';
import { UserRegistrationService } from 'src/app/user-registration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userObj: any;
  useriditem: any;
  uid: any;
  profileDetails:any;
  initialEdit =false;
  updateProfileForm:any;
  path:any;
  imgname:any;
  imageName:any;
  initialViewTransactions = false;
  transactionDetails: any;
  initialProfileView =true;
  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {

    this.userObj = localStorage.getItem('userDetailes');
      this.useriditem = JSON.parse(this.userObj);
      this.uid =this.useriditem[0]['uid'];

      let cards=this.service.getProfile(this.uid);
      cards.subscribe(
        (response: any) =>{this.profileDetails=response,
          this.service.profileDetails =this.profileDetails;
          this.path=this.profileDetails[0]["profilePic"],
          this.imgname=this.path.split("\\"),
          this.imageName=this.imgname[this.imgname.length-1];
          this.service.imageName = this.imageName;
        },
           (error: any) => this.toast.showError(error)
         );
  }

  edit(){
    this.router.navigate(['/dashboard/profile/edit']);
  }
  viewTransactions(){
    this.router.navigate(['/dashboard/profile/transactions']);
  }
}
