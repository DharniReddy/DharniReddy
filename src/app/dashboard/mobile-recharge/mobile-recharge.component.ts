import { CardDetails } from './../../register/cardDetails';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/user-registration.service';
import { ToasterService } from 'src/app/toaster.service';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.component.html',
  styleUrls: ['./mobile-recharge.component.css']
})
export class MobileRechargeComponent implements OnInit {

  plansForm:any;
  plansAmount:any;
  userObj:any;
  useriditem:any;
  uid:any;
  cardDetails:any;
  mobileRechargeDetailes:any;
  backendResponse:any;
  initial=false;
  planDetailes: any;
  allCardsDetailes: any;
  mobileRecharge =1;
  businessesList: any;
  plansList: any;

  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {

    this.plansForm = this.fb.group({
      mobileNumber :['',[Validators.required,Validators.pattern("[6-9]{1}[0-9]{9}")]],
      selectedSim:['',Validators.required],
      selectedPack:['',Validators.required],
      amount:['']
    });
    this.getBusinesses();
    this.getAllPlans();
  }
  getBusinesses(){
    let getResponse=this.service.getBusinessesByType(this.mobileRecharge)
    getResponse.subscribe(
      (response: any) =>{
        this.businessesList=response;
        console.log(this.businessesList)
      },
      (error: any) => this.toast.showError(error)
      );   
  }
  getAllPlans(){
    let getResponse=this.service.getAllPlans()
    getResponse.subscribe(
      (response: any) =>{
        this.plansList=response;
        console.log(this.plansList)
      },
      (error: any) => this.toast.showError(error)
      );   
  }
  onCheck(){
    if (this.plansForm.valid) {
      this.mobileRechargeDetailes = this.plansForm.value;
    /*call later 
    let resp =this.service.doCardRegistration(this.plansForm.value);
     resp.subscribe(
      (response: any) => window.alert(response),
         (error: any) => console.log('error',error)
       );*/
      this.router.navigate(['/dashboard/payment'])
    } else {
      Object.keys(this.plansForm.controls).forEach(field => {
        const control = this.plansForm.get(field);           
        control.markAsTouched({ onlySelf: true });      
      });
    }
}
getPlan(){
  this.service.mobileNumber = this.plansForm.value.mobileNumber;
  let plansResponse =this.service.getPlans(this.plansForm.value.selectedSim,this.plansForm.value.selectedPack);
    plansResponse.subscribe(
    (response: any) =>{this.planDetailes=response,
      this.plansAmount=this.planDetailes[0]["amount"],
      console.log(this.planDetailes);
      this.service.getplansData(this.planDetailes)
    },
       (error: any) => console.log('error',error)
     );
}

/*getRegisteredCards(){
  console.log("rrrrrrrrrrrrrr");
  this.userObj = localStorage.getItem('userDetailes');
  this.useriditem = JSON.parse(this.userObj);
  this.uid =this.useriditem[0]['uid'];
  this.initial=true;
  let cards=this.service.getRegisteredCards(this.uid);
  cards.subscribe(
    (response: any) =>{this.allCardsDetailes=response,
                      this.service.getcardsData(this.allCardsDetailes)
    },
       (error: any) => console.log('error',error)
     );
}*/

}
