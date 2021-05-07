import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/toaster.service';
import { BusinessService } from './business.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {
  userObj: any;
  useriditem: any;
  userId: any;
  mobileRechargeBusinessId =1;
  subscriptionsBusinessId =2;
  dthBusinessId = 3;
  constructor(private service:BusinessService,private toast:ToasterService) { }

  ngOnInit(): void {
    this.userObj = localStorage.getItem('userDetailes');
    this.useriditem = JSON.parse(this.userObj);
    this.userId =this.useriditem[0]['uid'];
  }
  mobileRecharge(){
    let transactionResponse=this.service.addToFavourites(this.userId,this.mobileRechargeBusinessId);
    transactionResponse.subscribe(
         (response: any) =>{
           this.toast.showSuccess(response)},
            (error: any) => this.toast.showInfo(error.error.text)
          );
  }
  subscriptions(){
    let transactionResponse=this.service.addToFavourites(this.userId,this.subscriptionsBusinessId);
    transactionResponse.subscribe(
         (response: any) =>{
           this.toast.showSuccess(response)},
            (error: any) =>this.toast.showInfo(error.error.text)
          );
  } 
  dth(){
    let transactionResponse=this.service.addToFavourites(this.userId,this.dthBusinessId);
    transactionResponse.subscribe(
         (response: any) =>{
           this.toast.showSuccess(response)},
            (error: any) =>{
              this.toast.showInfo(error.error.text)}
          );
  }
}
