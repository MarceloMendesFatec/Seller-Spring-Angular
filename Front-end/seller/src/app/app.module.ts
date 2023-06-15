import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SellersComponent } from './sellers/sellers.component';
import { SellerFormComponent } from './seller-form/seller-form.component';
import { HttpClientModule } from '@angular/common/http';
import { GenderPipe } from './Pipes/GenderPipe';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SellersComponent,
    SellerFormComponent,
    GenderPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
