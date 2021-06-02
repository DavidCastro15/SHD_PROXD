import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public identity;
  constructor(private _http: HttpClient) { }

  getUser(){    
    return this._http.get(apiUrl+'/users');
  }
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('username'));
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
      return this.identity;
  }

  getAlbums(id:number):Observable<any>{
    return this._http.get(apiUrl+'/albums?userId='+id);


    //https://jsonplaceholder.typicode.com/albums?userId=2
  }


  getPhotosAlbums(id: number):Observable<any>{
    return this._http.get(apiUrl+'/photos?albumId='+id);


  }
}
