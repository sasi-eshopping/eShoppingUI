import { Component, OnInit , Inject, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {ApiService} from "../core/api.service";
import { Token } from '../model/token.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit,OnDestroy {

  users: any;
  token =new Token();

  subscription1 :any;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.subscription1=this.apiService.getUsers()
      .subscribe( data => {
        console.log(data)
          this.users = data;
      });
  }
  
  deleteUser(user: User): void {
    this.subscription1=this.apiService.deleteUser(user.id)
      .subscribe( data => {
        debugger
        
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.sessionStorage.removeItem("editUserId");
    window.sessionStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

  logout(): void {
   
    this.subscription1=this.apiService.logout().subscribe(data => {
      console.log('lohout');
      this.router.navigate(['login']);
    });
  
      
  };
  ngOnDestroy()
  {
    this.subscription1.unsubscribe();

  }
}
