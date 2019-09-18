import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContent} from './home/home.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    HttpClientModule,
    NgbModule,
    NgxImageZoomModule.forRoot()
  ],
  entryComponents: [NgbdModalContent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
