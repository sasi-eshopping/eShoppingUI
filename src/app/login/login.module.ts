import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { RegisteredComponent } from './registered/registered.component';
import {LoginComponent} from './login/login.component';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [LoginComponent,RegisteredComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
