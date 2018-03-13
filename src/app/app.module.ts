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
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {VirtualScrollModule} from 'angular2-virtual-scroll';
import {ListItemComponent} from './components/list-item/list-item.component';
import {InfiniteListComponent} from './components/infinite-list/infinite-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GalleryModule} from '@ngx-gallery/core';
import {GallerizeModule} from '@ngx-gallery/gallerize';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {LightboxComponent} from './components/lightbox/lightbox.component';



@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    SearchBarComponent,
    GalleryComponent,
    ListItemComponent,
    InfiniteListComponent,
    LightboxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxElectronModule,
    InfiniteScrollModule,
    NgMasonryGridModule,
    VirtualScrollModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule
  ],
  providers: [
    GetPostsService,
    XmlParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
