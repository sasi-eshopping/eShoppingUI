import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import {ApiService} from "./core/api.service";
import {RefreshTokenInterceptor} from "./core/token-interceptor.service";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import {httpInterceptorProviders} from "./model/http.interceptors";
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
   
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
