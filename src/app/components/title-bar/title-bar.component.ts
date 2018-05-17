import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {IWindowSettings} from '../../types/IWindowSettings';
import {t} from '@angular/core/src/render3';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  winSize: number[];
  winPos: number[];

  constructor(private electron: ElectronService) {

  }

  ngOnInit() {
    this.winSize = this.electron.remote.getCurrentWindow().getSize();
    this.winPos = this.electron.remote.getCurrentWindow().getPosition();
  }

  Minimise() {
    this.electron.remote.getCurrentWindow().minimize();
  }

  Maximise() {
    if (!this.electron.remote.getCurrentWindow().isMaximized()) {
      this.winSize = this.electron.remote.getCurrentWindow().getSize();
      this.winPos = this.electron.remote.getCurrentWindow().getPosition();
      this.electron.remote.getCurrentWindow().maximize();
    } else {
      this.electron.remote.getCurrentWindow().setPosition(this.winPos[0], this.winPos[1], true);
      this.electron.remote.getCurrentWindow().setSize(this.winSize[0], this.winSize[1], true);
    }
  }

  Exit() {
    this.electron.ipcRenderer.send('quit');
  }
}
