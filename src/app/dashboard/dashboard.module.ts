import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BusinessesComponent } from './businesses/businesses.component';
import {MatCardModule} from '@angular/material/card';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DthComponent } from './dth/dth.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
// import { DialougeComponent } from './dialouge/dialouge.component';
@NgModule({
  declarations: [WelcomeComponent, BusinessesComponent, MobileRechargeComponent, SubscriptionsComponent, DthComponent, PaymentComponent, ProfileComponent, EditProfileComponent, ViewTransactionsComponent, FavouritesComponent, TransactionHistoryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
