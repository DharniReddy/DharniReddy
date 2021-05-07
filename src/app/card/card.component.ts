import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardDetails } from '../register/cardDetails';
import { ToasterService } from '../toaster.service';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cardForm :any;
  message:any;
  userDetailes:any;
  public users: any;
  obj:any;
  arr: any;
  item:any;
  localObj:any;
  userObj:any;
  useriditem:any;
  uid:any;
  userCardDetails:CardDetails = new CardDetails();
  
  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }
  ngOnInit(): void {
    this.userObj = localStorage.getItem('userDetailes');
    this.useriditem = JSON.parse(this.userObj);
    this.uid =this.useriditem[0]['uid'];
    this.userCardDetails.userId=this.uid;
    this.cardForm = this.fb.group({
      cardNumber :['',[Validators.required,Validators.pattern("[4-6]{1}[0-9]{15}")]],
      cardHolderName:['',Validators.required],
      cardType:['',Validators.required],
      cardExpiryDate:['',[Validators.required,Validators.pattern("^(0[1-9]|1[0-2])\/?([2-9]{1}[0-9]{1}[2-9]{1}[2-9]{1}|[0-9]{2})$")]],    
    });
  }
  onSubmit(){
    if (this.cardForm.valid) {
      let resp =this.service.doCardRegistration(this.userCardDetails);
      resp.subscribe(
        (response: any) => {
         this.toast.showSuccess(response)
         if(localStorage.getItem('user')==null){
          this.router.navigate(['/login'])
         }
         else{
           this.router.navigate(['/dashboard'])
         }
          },
          (error: any) => this.toast.showError(error)
        );
      } else {
        Object.keys(this.cardForm.controls).forEach(field => {
          const control = this.cardForm.get(field);           
          control.markAsTouched({ onlySelf: true });
        });
      }
  }
}
