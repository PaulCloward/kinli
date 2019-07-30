import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public router: Router) { 
  }

  ngOnInit() {
  }

  
}
