import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Token} from "../model/token.model";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { share } from 'rxjs/operators';

@Injectable()
export class ApiService {

  loginPayload1 : any ;
  users: any;
  token =new Token();
  constructor(private http: HttpClient,private router: Router) { }
  baseUrl: string = 'http://localhost:8085/users/';
  
  login(loginPayload): Observable<any> {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8085/' + 'oauth/token', loginPayload, {headers});
  }

  logout() : Observable<any>
  {
    
    this.token.accessToken = JSON.parse(window.sessionStorage.getItem('token')).access_token;
    this.token.refreshToken =JSON.parse(window.sessionStorage.getItem('token')).refresh_token;
    this.token.expiration= JSON.parse(window.sessionStorage.getItem('token')).expires_in;
    this.token.invalidtime=JSON.parse(window.sessionStorage.getItem('token')).invat;
    return this.http.post(this.baseUrl + 'user/logout', this.token);
    
   

  }
  
  getUsers() : Observable<any>{
    const headers = {
      'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
    
    }
    return this.http.get(this.baseUrl + 'user',{headers}).pipe(share());
  }

  getUserById(id: number): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
    
    }
    return this.http.get(this.baseUrl + 'user/' + id ,{headers}).pipe(share());
  }

  createUser(user: User): Observable<any>{
    const headers = {
      'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
    
    }
    return this.http.post(this.baseUrl + 'user', user,{headers}).pipe(share());
  }

  updateUser(user: User): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
    
    }
    return this.http.put(this.baseUrl + 'user/' + user.id ,/*+ '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token*/user,{headers}).pipe(share());
  }

  deleteUser(id: number): Observable<any>{
    const headers = {
      'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
    
    }
    return this.http.delete(this.baseUrl + 'user/' + id ,{headers}/*+ '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token*/).pipe(share());
  }

  refreshAccessToken() : Observable<any>
  {
    const body = new HttpParams().set('grant_type', 'refresh_token').set('refresh_token',JSON.parse(window.sessionStorage.getItem('token')).refresh_token);
    this.loginPayload1 =body.toString;
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    
    console.log('inside refresh token');
    return this.http.post('http://localhost:8085/' + 'oauth/token', body , {headers}).pipe(share());
  }
}
