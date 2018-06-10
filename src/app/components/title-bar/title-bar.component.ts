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
    this.winSize = [500, 500];
    this.winPos = [0, 0];

  }

  ngOnInit() {
  }

  Minimise() {
    this.electron.remote.getCurrentWindow().minimize();
  }

  // Makes sure window position and size are saved when minimising and restoring
  Maximise() {
    this.electron.ipcRenderer.send('MaximiseMe');
  }

  Exit() {
    this.electron.ipcRenderer.send('quit', {winPos: this.winPos, winSize: this.winSize});
  }
}
