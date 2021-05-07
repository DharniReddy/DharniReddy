import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/toaster.service';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  businessesList: any;
  transactionsForm: any;
  mobileRecharge =1;
  subscriptions =2;
  dth =3;
  businessTypes: any;
  userObj: any;
  useriditem: any;
  userId: any;
  transactionsData:any;
  initialViewTransactions=false;
  constructor(private service:TransactionsService,private fb:FormBuilder,private toast:ToasterService) { }

  ngOnInit(): void {
    this.userObj = localStorage.getItem('userDetailes');
    this.useriditem = JSON.parse(this.userObj);
    this.userId =this.useriditem[0]['uid'];
    this.transactionsForm = this.fb.group({
      selectedBusiness :[''],
      selectedBusinessByType :[''],
      monthValue:[''],
      year:[''],
      getmonth:[''],
      getday:['']
    });
    this.getBusinesses()
  }
  getBusinesses(){
    let cards=this.service.getBusinesses()
    cards.subscribe(
      (response: any) =>{
        this.businessesList=response;
      },
      (error: any) => this.toast.showError(error)
      );    
  }
  getBusinessTypes(){
    if(this.transactionsForm.value.selectedBusiness == "Mobile Recharge"){
      let res=this.service.getBusinessesByType(this.mobileRecharge)
      res.subscribe(
       (data:any)=>
           this.businessTypes=data
       );
    }
    else if(this.transactionsForm.value.selectedBusiness == "Subscriptions"){
      let res=this.service.getBusinessesByType(this.subscriptions)
      res.subscribe(
       (data:any)=>
           this.businessTypes=data
       );
    }
    else if(this.transactionsForm.value.selectedBusiness == "DTH"){
      let res=this.service.getBusinessesByType(this.dth)
      res.subscribe(
       (data:any)=>
           this.businessTypes=data
       );
    }
  }
  getDataByDay(){
    this.initialViewTransactions=true;
    this.transactionsForm.patchValue({
       getmonth : [''],
       year :['']
     })
    if(!this.transactionsForm.value.selectedBusinessByType){
      let res=this.service.getBusinessesByDay(this.transactionsForm.value.selectedBusiness,this.userId,this.transactionsForm.value.getday)
       res.subscribe(
        (data:any)=>
            this.transactionsData =data
        );
    }
    else{
      let res=this.service.getBusinessTypesByDay(this.userId,this.transactionsForm.value.selectedBusiness,this.transactionsForm.value.selectedBusinessByType,this.transactionsForm.value.getday)
       res.subscribe(
        (data:any)=>
        this.transactionsData =data 
        );
    }
  }
  getDataByMonth(){
    this.initialViewTransactions=true;
    this.transactionsForm.patchValue({
       getday : [''],
       year :['']
     })
    console.log(this.transactionsForm.value.getmonth);
    if(!this.transactionsForm.value.selectedBusinessByType){
      let res=this.service.getBusinessesByMonth(this.transactionsForm.value.selectedBusiness,this.userId,this.transactionsForm.value.getmonth)
       res.subscribe(
        (data:any)=>
        this.transactionsData =data
        );
    }
    else{
      let res=this.service.getBusinessTypesByMonth(this.userId,this.transactionsForm.value.selectedBusiness,this.transactionsForm.value.selectedBusinessByType,this.transactionsForm.value.getmonth)
       res.subscribe(
        (data:any)=>{
        this.transactionsData =data
        }
        );
    }
  }
  getDataByYear(){
    this.initialViewTransactions=true;
    this.transactionsForm.patchValue({
       getmonth : [''],
       getday :['']
     })
    if(!this.transactionsForm.value.selectedBusinessByType){
      let res=this.service.getBusinessesByYear(this.transactionsForm.value.selectedBusiness,this.userId,this.transactionsForm.value.year)
       res.subscribe(
        (data:any)=>
        this.transactionsData =data
        );
    }
    else{
      let res=this.service.getBusinessTypesByYear(this.userId,this.transactionsForm.value.selectedBusiness,this.transactionsForm.value.selectedBusinessByType,this.transactionsForm.value.year)
       res.subscribe(
        (data:any)=>
        this.transactionsData =data
        );    
    }
  }
}
