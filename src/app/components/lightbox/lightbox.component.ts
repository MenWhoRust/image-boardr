import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {AppModule} from '../../app.module';
import {AppComponent} from '../../app.component';
import {createComponent} from '@angular/compiler/src/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit {
  @Output() destroyCheck: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  fileUrl: string;

  @Input()
  tags: string[];

  isFirstLoad = true;
  isLoaded = false;

  log(event) {
    AppComponent.log('not loaded', event);
  }

  constructor(private electron: ElectronService) {
  }

  ngOnInit() {
    AppComponent.log('not loaded', this.isLoaded);
  }

  loaded() {
    this.isLoaded = !this.isLoaded;
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  closeModal() {
    this.destroyCheck.emit('kill me');
  }

  getDestroyEvent() {
    return this.destroyCheck;
  }

}
