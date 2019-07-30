import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-go-to-checkout',
  templateUrl: './popup-go-to-checkout.component.html',
  styleUrls: ['./popup-go-to-checkout.component.css']
})
export class PopupGoToCheckoutComponent implements OnInit {

  closeResult: string;

  setCount:number = 1;
  setUnitCount:number = 25;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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
    } else {
      return  `with: ${reason}`;
    }
  }

  addUnit(event:Event){
    event.preventDefault();
    if(this.setCount < 4){
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
    if(setAmount == 1){
      this.setUnitCount = 25;
    } else if(setAmount == 2){
      this.setUnitCount = 50;
    } else if(setAmount == 3){
      this.setUnitCount = 75;
    } else if(setAmount == 4){
      this.setUnitCount = 100;
    }
  }
}
