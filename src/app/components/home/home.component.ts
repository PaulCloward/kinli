import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('changeState', [
      state('state1', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('state2', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('*=>state1', animate('300ms')),
      transition('*=>state2', animate('2000ms'))
    ]),
    trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(600, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(1000, style({opacity:0})) 
    ])
  ])
  ]
})
export class HomeComponent implements OnInit {


  STEP_ONE:number = 1;
  STEP_TWO:number = 2;
  STEP_THREE:number = 3;
  STEP_FOUR:number = 4;
  STEP_FIVE:number = 5;

  currentStep:number = this.STEP_ONE;

  constructor(private mRouter:Router) { }

  ngOnInit() {
  }

  onClickBuyNow(){
    this.mRouter.navigateByUrl('bio-basin-2');
  }

  onClickContact(){
    this.mRouter.navigateByUrl('contact');
  }

}
