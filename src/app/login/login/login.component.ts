import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {HttpParams} from "@angular/common/http";
import { Subscription } from "rxjs";
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{

loginForm: FormGroup;


  invalidLogin: boolean = false;
  subscribe:Subscription;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.subscribe=this.apiService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.router.navigate(['../../home']);
    }, error => {
        alert(error.message) 
    });
  }
  
 ngOnInit() {
    window.sessionStorage.removeItem('token');
   
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
