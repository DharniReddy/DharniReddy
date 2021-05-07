import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/toaster.service';
import { UserRegistrationService } from 'src/app/user-registration.service';
import { TransactionsModel } from '../transactions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  userCardDetails:any;
  cardId:any;
  userObj: any;
  useriditem: any;
  uid: any;
  initial=false;
  paymentDetails:TransactionsModel = new TransactionsModel();
  cvvForm: any;
  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {
      this.userObj = localStorage.getItem('userDetailes');
      this.useriditem = JSON.parse(this.userObj);
      this.uid =this.useriditem[0]['uid'];
      let cards=this.service.getRegisteredCards(this.uid);
      cards.subscribe(
        (response: any) =>{this.userCardDetails=response,
                          this.service.getcardsData(this.userCardDetails)},
           (error: any) => this.toast.showError(error)
         );

         this.cvvForm = this.fb.group({
          cvv :['',[Validators.required,Validators.pattern("[0-9]{3}")]]
          });  
  }

  getCardNumber(user:any){
    this.initial =true;
    this.cardId=user ;
    console.log(this.cardId);
  }
  proceed(){
    this.initial =false;
    this.paymentDetails.userId = this.uid;
    this.paymentDetails.cardId = this.cardId;
    this.paymentDetails.businessTypeId= this.service.plansData[0]["businessTypeId"];
    this.paymentDetails.planAmount = this.service.plansData[0]["amount"];
    this.paymentDetails.mobileNumber =this.service.mobileNumber;
    let transactionResponse=this.service.doTransaction(this.paymentDetails);
    transactionResponse.subscribe(
        (response: any) =>{
          this.toast.showSuccess(response),
          this.router.navigate(['/dashboard'])
        },
           (error: any) => this.toast.showError(error)
         );
  }
}
