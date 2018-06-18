import {Component, ComponentFactory, ComponentRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {LightboxComponent} from '../lightbox/lightbox.component';

@Component({
  selector: 'app-post-source',
  templateUrl: './post-source.component.html',
  styleUrls: ['./post-source.component.css']
})
export class PostSourceComponent implements OnInit, OnChanges {

  @Input()
  url: string;

  @Output()
  openUrl: EventEmitter<string> = new EventEmitter<string>();

  regex: RegExp = new RegExp(/\w+:\/\/([\w\.-]+)/);
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  shorten(value: string): any {
    const matches = this.regex.exec(value);
    if (matches !== null) {

      return { text: matches[1], isUrl: true};
    }
    return { text: value, isUrl: false};
  }

  openBrowser(url: string) {
    this.openUrl.emit(this.url);
  }
}
