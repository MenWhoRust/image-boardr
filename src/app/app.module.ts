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
import {GalleryImageComponent} from './components/gallery-image/gallery-image.component';
import {BoardRatingService} from './services/board-rating.service';
import {FormsModule} from '@angular/forms';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { ClickOutsideDirective } from './Directives/click-outside.directive';



@NgModule({
  entryComponents: [LightboxComponent],
  declarations: [
    AppComponent,
    TitleBarComponent,
    SearchBarComponent,
    GalleryComponent,
    LightboxComponent,
    GalleryImageComponent,
    ErrorDisplayComponent,
    ClickOutsideDirective

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxElectronModule,
    NgMasonryGridModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    GetPostsService,
    XmlParserService,
    BoardRatingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
