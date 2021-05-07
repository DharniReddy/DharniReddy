import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/toaster.service';
import { UserRegistrationService } from 'src/app/user-registration.service';

@Component({
  selector: 'app-dth',
  templateUrl: './dth.component.html',
  styleUrls: ['./dth.component.css']
})
export class DthComponent implements OnInit {
  dthPlansForm:any;
  plansAmount:any;
  planDetailes: any;
  dth =3;
  businessesList: any;
  plansList: any;

  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {

    this.dthPlansForm = this.fb.group({
      mobileNumber :['',[Validators.required,Validators.pattern("[6-9]{1}[0-9]{9}")]],
      selectedSim:['',Validators.required],
      selectedPack:['',Validators.required],
      amount:['']
    });
    this.getBusinesses();
    this.getAllPlans();
  }

  getBusinesses(){
    let getResponse=this.service.getBusinessesByType(this.dth)
    getResponse.subscribe(
      (response: any) =>{
        this.businessesList=response;
      },
      (error: any) =>this.toast.showError(error)
      );   
  }
  getAllPlans(){
    let getResponse=this.service.getAllPlans()
    getResponse.subscribe(
      (response: any) =>{
        this.plansList=response;
      },
      (error: any) => this.toast.showError(error)
      );   
  }

onCheck(){
  if (this.dthPlansForm.valid) {

    this.router.navigate(['/dashboard/payment']);
  } else {
    Object.keys(this.dthPlansForm.controls).forEach(field => { 
      const control = this.dthPlansForm.get(field);           
      control.markAsTouched({ onlySelf: true });       
    });
  }
}
getPlan(){ 
  this.service.mobileNumber = this.dthPlansForm.value.mobileNumber;
  let plansResponse =this.service.getPlans(this.dthPlansForm.value.selectedSim,this.dthPlansForm.value.selectedPack);
  plansResponse.subscribe(
    (response: any) =>{this.planDetailes=response,
      this.plansAmount=this.planDetailes[0]["amount"],
      this.service.getplansData(this.planDetailes)
    },
       (error: any) => this.toast.showError(error)
     );
}

}
