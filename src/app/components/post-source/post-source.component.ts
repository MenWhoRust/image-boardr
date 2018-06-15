import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-post-source',
  templateUrl: './post-source.component.html',
  styleUrls: ['./post-source.component.css']
})
export class PostSourceComponent implements OnInit, OnChanges {

  @Input()
  url: string;

  regex: RegExp = new RegExp(/\w+:\/\/([\w\.-]+)/);
  constructor(private electron: ElectronService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  shorten(value: string): any {
    console.log('service value', value);
    const matches = this.regex.exec(value);
    console.log('matches', matches);
    if (matches !== null) {

      return { text: matches[1], isUrl: true};
    }
    return { text: value, isUrl: false};
  }

  openBrowser(url: string) {
    this.electron.shell.openExternal(url);
  }

}
