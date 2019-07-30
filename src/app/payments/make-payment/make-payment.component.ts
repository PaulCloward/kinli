import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  handler:any;
  amount: number = 500; // == $5.00

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  	this.handler = StripeCheckout.configure({
  		key: environment.stripeKey,
  		locale: 'auto',
  		token: token => {
  			this.paymentService.processPayment(token, this.amount)
  		}
  	});
  }

  handlePayment(){
    this.handler.open({
   		name: 'FireStarter',
   		description: "Deposit Funds to Account",
   		amount: this.amount   
    });
  }

  @HostListener('window:popstate')
  	onPopstate(){
  		this.handler.close();
  	}
}
