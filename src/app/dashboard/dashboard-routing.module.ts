import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentComponent } from './payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessesComponent } from './businesses/businesses.component';
import { DthComponent } from './dth/dth.component';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AuthenticationGuard } from '../authentication.guard';


const routes: Routes = [
  {path:'',component:WelcomeComponent,canActivate:[AuthenticationGuard],
  children: [
    { path:"",component:BusinessesComponent},
    { path:"mobile",component:MobileRechargeComponent},
    { path:"subscriptions",component:SubscriptionsComponent},
    { path:"dth",component:DthComponent},
    {path:"payment",component:PaymentComponent},
    {path:"profile",component:ProfileComponent,
      children:[
      {path:"edit",component:EditProfileComponent},
      {path:"transactions",component:ViewTransactionsComponent}
      ]
    },
  {path:"favourites",component:FavouritesComponent},
  {path:"transactionshistory",component:TransactionHistoryComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
