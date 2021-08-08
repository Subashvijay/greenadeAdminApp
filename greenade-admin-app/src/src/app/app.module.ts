import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ItemViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
