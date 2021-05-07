import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  plansData:any;
  cardsData:any;
  mobileNumber:any;
  imageName:any;
  profileDetails:any;
  constructor(private http:HttpClient) { }

  public doRegistration(user :any){
    return this.http.post("http://localhost:8080/register",user,{responseType:'text' as 'json'});
  }
  public getUsers(){
    return this.http.get("http://localhost:8080/getAllUsers");
  }
  public getUserByEmail(email:any){
    return this.http.get("http://localhost:8080/getUserByEmail/"+email);
  }
 
  public checkLoginCredentials(user:any){
    return this.http.post("http://localhost:8080/login",user,{responseType:'text' as 'json'});
  }

  public forgotPassword(user:any){
     return this.http.put("http://localhost:8080/forgotPassword",user,{responseType:'text' as 'json'});
  }

  public doCardRegistration(user :any){
    return this.http.post("http://localhost:8080/addcard",user,{responseType:'text' as 'json'});
  }

  public getPlans(sim:any,plan:any){
    return this.http.get("http://localhost:8080/getplans/"+sim+"/"+plan);
  }

  public getRegisteredCards(userId:any){
    return this.http.get("http://localhost:8080/getcards/"+userId);
  }

  public doTransaction(payment:any){
    console.log('in transactions service',payment)
    return this.http.post("http://localhost:8080/payment",payment,{responseType:'text' as 'json'});
  }

  public getProfile(userId:any){
    return this.http.get("http://localhost:8080/profile/"+userId);
  }

  public updateUserProfile(userProfile:any,uid:any){
    return this.http.put("http://localhost:8080/updateprofile/"+uid,userProfile,{responseType:'text' as 'json'});
  }

  public viewTransactions(userId:any){
    return this.http.get("http://localhost:8080/viewtransactions/"+userId);
  }

  public getBusinessesByType(businessId:any){
      return this.http.get("http://localhost:8080/getbusinesstypes/"+businessId);
  }
  
  public getAllPlans(){
    return this.http.get("http://localhost:8080/getallplans");
  }
  public getplansData(user:any){
    this.plansData =user;
  }
  public getcardsData(cards:any){
    console.log(cards);
    this.cardsData = cards;
  }

  // setLogin(){
  //   localStorage.setItem('token1','true');
  // }
  // getLogin(){
  //   return localStorage.getItem('token1'); 
  // }
  

}
