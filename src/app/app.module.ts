import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { AuthComponent } from './view/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
