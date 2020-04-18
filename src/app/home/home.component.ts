import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      cmd: [],
      add: [],
      business: [],
      item_name: [],
      discount_amount: [],
      currency_code: ['', Validators.required],
      return: [],
      cancel_return: [],
      amount: ['', Validators.required]
    });

  }

  

}
