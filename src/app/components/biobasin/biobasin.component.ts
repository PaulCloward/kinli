import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { IShippingInfo } from '../../model/IShippingInfo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-biobasin',
  templateUrl: './biobasin.component.html',
  styleUrls: ['./biobasin.component.css'],
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
export class BiobasinComponent implements OnInit {

  closeResult: string;
  
  CHECK_OUT_STEP_NONE:number = -1;
  CHECK_OUT_STEP_1:number = 1;
  CHECK_OUT_STEP_2:number = 2;
  CHECK_OUT_STEP_3:number = 3;
  CHECK_OUT_STEP_COMPLETE:number = 4;
  checkOutProcessStep:number = this.CHECK_OUT_STEP_NONE;

  PRICE_PER_UNIT:number = 10;
  setCount:number = 1;
  setUnitCount:number = 25;
  calculatedUnitCost:number = this.setUnitCount * this.PRICE_PER_UNIT;
  SHIPPING_COST:number = 10;
  TAX_RATE:number = .0485;
  totalCost:number;

  isShippingAddressFilledOut:boolean = false;

  shippingInformation:IShippingInfo = {firstName:'', lastName: '', email: '', addressLineOne: '', addressLineTwo:'', city: '', state: '', zipCode: -1};

  sub:any;

  formShippingAddress: FormGroup;

  toState = 'state1';
  currentState:any;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => this.determineIncomingRoute(v));

    this.determineUnitCount(this.setCount);

    this.formShippingAddress = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      addressLineOne: ['', [
        Validators.required
      ]],
      addressLineTwo: ['', [
      ]],
      city: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      zipCode: [null, [
        Validators.required,
         Validators.minLength(5),
          Validators.maxLength(5)
      ]]
    });

    this.formShippingAddress.valueChanges.subscribe(
      formAddress => this.shippingFormChange(formAddress)
    )
  }

  shippingFormChange(formShippingAddress){
    this.shippingInformation.firstName = formShippingAddress.firstName;
    this.shippingInformation.lastName = formShippingAddress.lastName;
    this.shippingInformation.email = formShippingAddress.email;
    this.shippingInformation.addressLineOne = formShippingAddress.addressLineOne;
    this.shippingInformation.addressLineTwo = formShippingAddress.addressLineTwo;
    this.shippingInformation.city = formShippingAddress.city;
    this.shippingInformation.state = formShippingAddress.state;
    this.shippingInformation.zipCode = formShippingAddress.zipCode; 
  }

  
  changeState(state: any) {
    this.toState = state;
  }

  get firstName() {
    return this.formShippingAddress.get('firstName');
  }

  get lastName() {
    return this.formShippingAddress.get('lastName');
  }

  get email() {
    return this.formShippingAddress.get('email');
  }

  get addressLineOne() {
    return this.formShippingAddress.get('addressLineOne');
  }

  get addressLineTwo() {
    return this.formShippingAddress.get('addressLineTwo');
  }

  get city() {
    return this.formShippingAddress.get('city');
  }

  get state() {
    return this.formShippingAddress.get('state');
  }

  get zipCode() {
    return this.formShippingAddress.get('zipCode');
  }

  onSelectState(state:string){
    this.shippingInformation.state = state;
    this.formShippingAddress.controls['state'].setValue(state);
  }

  determineIncomingRoute(v){   
      //Testing if coming from BUY NOW tab
      if(v['some_data'] != null){
        this.checkOutProcessStep = this.CHECK_OUT_STEP_1;
      }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } 
    else {
      return  `with: ${reason}`;
    }
  }

  addUnit(event:Event){
    event.preventDefault();
    if(this.setCount < 20){
      this.setCount += 1;
      this.determineUnitCount(this.setCount);
    }
  }

  decrementUnit(event:Event){
    event.preventDefault();
    if(this.setCount > 1){
      this.setCount -= 1;
      this.determineUnitCount(this.setCount);
    }
  }

  determineUnitCount(setAmount){
    this.setUnitCount = 25 * setAmount;
    this.calculatedUnitCost = this.PRICE_PER_UNIT * this.setUnitCount;
    this.determineTotalCost();
  }

  determineTotalCost(){
    this.totalCost = this.calculatedUnitCost + this.SHIPPING_COST + (this.calculatedUnitCost * this.TAX_RATE);
  }

  checkout(){
  	 this.modalService.dismissAll();
  	 this.checkOutProcessStep = this.CHECK_OUT_STEP_1;
  }

  directToStep(step:number){
  	this.checkOutProcessStep= step;
  }

  useShippingAsBillingAddress(event:Event){
    event.preventDefault();
  }

  selectCreditCard(event:Event){
    event.preventDefault();
  }

  paymentReadyNext(event:Event){
    this.modalService.dismissAll();
    this.checkOutProcessStep = this.CHECK_OUT_STEP_3;
  }
}
