import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ToasterService } from 'src/app/toaster.service';
import { BusinessService } from '../businesses/business.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  userObj: any;
  useriditem: any;
  userId: any;
  favouritesList: any;

  constructor(private service:BusinessService,private router: Router,private toast:ToasterService) { }

  ngOnInit(): void {

    this.userObj = localStorage.getItem('userDetailes');
      this.useriditem = JSON.parse(this.userObj);
      this.userId =this.useriditem[0]['uid'];
      let cards=this.service.getFavouriteBusinesses(this.userId);
      cards.subscribe(
        (response: any) =>{
          this.favouritesList=response
        },
           (error: any) => this.toast.showError(error)
         );

  }
  goToBusiness(businessName:any){
    if(businessName == "Mobile Recharge"){
      this.router.navigate(['/dashboard/mobile'])
    }
    else if(businessName == "Subscriptions"){
      this.router.navigate(['/dashboard/subscriptions'])
   }
   else if(businessName == "DTH"){
    this.router.navigate(['/dashboard/dth'])
   }
  }

}
