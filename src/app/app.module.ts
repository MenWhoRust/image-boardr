import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GetPostsService} from './services/getposts.service';
import {TitleBarComponent} from './components/title-bar/title-bar.component';
import {NgxElectronModule} from 'ngx-electron';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {XmlParserService} from './services/xml-parser.service';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LightboxComponent} from './components/lightbox/lightbox.component';



@NgModule({
  entryComponents: [LightboxComponent],
  declarations: [
    AppComponent,
    TitleBarComponent,
    SearchBarComponent,
    GalleryComponent,
    LightboxComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxElectronModule,
    NgMasonryGridModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [
    GetPostsService,
    XmlParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
