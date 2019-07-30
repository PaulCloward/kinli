import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMessage } from '../../model/IMessage';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit {

  messageSubmitted:boolean = false;
  contactForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    this.messageSubmitted = false;

    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      message: ['', [
        Validators.required
      ]]
    });

    this.contactForm.valueChanges.subscribe(
      form => this.formChange(form)
    )
  }

  formChange(form){
    const name = form.name;
    const email = form.email;
    const message = form.message;
  }

  submit(){
  	this.messageSubmitted = true;
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }



}
