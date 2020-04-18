import { Component, OnInit} from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import * as $ from 'jquery';

import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-dream-app';
  checkoutForm;
  searchForm;

  items;
  
  constructor(private formBuilder: FormBuilder,private router:Router) 
  {
    this.checkoutForm = this.formBuilder.group({
      cmd: '',
      display: ''
    });
    this.searchForm = this.formBuilder.group({
      search: ''
     
    });
    
  }
  ngOnInit(){
	
   // this.router.navigate(['/home']);
          
  
    
 
}
  onSubmit(customerData:NgForm) {
    // Process checkout data here

    if( customerData == this.checkoutForm.value)
    {
  
    console.log('inside checkout form');
    }
    else
    {
    
    console.log('inside search form');
    }
    console.warn('Your order has been submitted');
  }
}
