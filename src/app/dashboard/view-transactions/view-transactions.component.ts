import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/toaster.service';
import { UserRegistrationService } from 'src/app/user-registration.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  userObj: any;
  useriditem: any;
  userId: any;
  transactionDetails: any;

  constructor(private fb:FormBuilder,private service:UserRegistrationService, private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {
    this.userObj = localStorage.getItem('userDetailes');
    this.useriditem = JSON.parse(this.userObj);
    this.userId =this.useriditem[0]['uid'];
    let resp=this.service.viewTransactions(this.userId);
    resp.subscribe(
      (response: any) =>{this.transactionDetails=response
        console.log(this.transactionDetails)},
         (error: any) => this.toast.showError(error)
       );
  }

}
