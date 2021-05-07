import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  url = "http://localhost:8080/" ;

  constructor(private http:HttpClient) { }

  public getBusinesses(){
    return this.http.get(this.url+"getbusinesses");
  }

  public getBusinessesByType(businessId:any){
    return this.http.get(this.url+"getbusinesstypes/"+businessId);
  }

  public getBusinessesByDay(businessName:any,userId:any,day:any){
    
    return this.http.get(this.url+"getday/"+userId+"/"+businessName+"/"+day);
  }

  public getBusinessTypesByDay(userId:any,businessName:any,businessType:any,day:any){
    return this.http.get(this.url+"getdaybybusinesstype/"+userId+"/"+businessName+"/"+businessType+"/"+day);
  }

  public getBusinessesByYear(businessName:any,userId:any,year:any){
    
    return this.http.get(this.url+"getbusinessbyyear/"+userId+"/"+businessName+"/"+year);
  }

  public getBusinessTypesByYear(userId:any,businessName:any,businessType:any,year:any){
    return this.http.get(this.url+"getbusinesstypebyyear/"+userId+"/"+businessName+"/"+businessType+"/"+year); 
  }

  public getBusinessesByMonth(businessName:any,userId:any,mon:any){  
    return this.http.get(this.url+"getbusinessbymonth/"+userId+"/"+businessName+"/"+mon);
  }
  
  public getBusinessTypesByMonth(userId:any,businessName:any,businessType:any,mon:any){
    return this.http.get(this.url+"getbusinesstypebymonth/"+userId+"/"+businessName+"/"+businessType+"/"+mon);
    
  }


}
