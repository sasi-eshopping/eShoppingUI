import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

const routes: Routes = [
 
  {path:'user',loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},

 
  { path: 'edit-user', component: EditUserComponent },
  { path: 'home', component: HomeComponent   },
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
];

export const routing = RouterModule.forRoot(routes);
