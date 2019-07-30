import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  showView1:boolean = true;

  largeDisplayName:string = "Dr. Sonia Nash";
  largeDisplayTitle:string = "Pharmasist, and Candy Enthusiast";

  constructor() { }

  ngOnInit() {
  }

  clickMeetClinicians(){
  	this.showView1 = false;
  }

  clickClinician(name:string,title:string){
    this.showView1 = true;
    this.largeDisplayName = name;
    this.largeDisplayTitle = title;
  }

}
