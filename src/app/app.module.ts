import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BiobasinComponent } from './components/biobasin/biobasin.component';
import { ContactComponent } from './components/contact/contact.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PopupGoToCheckoutComponent } from './components/popup-go-to-checkout/popup-go-to-checkout.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';

import { PaymentService } from './payments/payment.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  /*{path:'', component: LandingPageComponent},*/
  {path:'landing-page', component: LandingPageComponent},
  {path:'bio-basin', component: BiobasinComponent},
  {path:'contact', component: ContactComponent},
  {path:'who-we-are', component: WhoWeAreComponent},
  {path:'testimonials', component: TestimonialsComponent},
  {path:'popup', component: PopupGoToCheckoutComponent},
  {path : 'bio-basin-2', component : BiobasinComponent, data : {some_data : 'buy-noww'}},
  {path:'make-payment', component: MakePaymentComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BiobasinComponent,
    ContactComponent,
    WhoWeAreComponent,
    LandingPageComponent,
    TestimonialsComponent,
    PopupGoToCheckoutComponent,
    MakePaymentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
