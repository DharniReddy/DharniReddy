import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http:HttpClient) { }

  public addToFavourites(userId :any,businessId:any){
    return this.http.post("http://localhost:8080/favourites/"+userId+"/"+businessId,{responseType:'text' as 'json'});
  }
  public getFavouriteBusinesses(userId:any){
    return this.http.get("http://localhost:8080/getfavourites/"+userId);
  }
}
