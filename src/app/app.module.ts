import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlassesComponent } from './components/glasses/glasses.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserService } from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { StorageService } from './services/storage.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CartServiceService } from './services/cart-service.service';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    GlassesComponent,
    ContactComponent,
    RegistrationComponent,
    LoginComponent,
    DetailsComponent,
    ProfileComponent,
    CartComponent,
    FilterPipe
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService, StorageService, CartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
