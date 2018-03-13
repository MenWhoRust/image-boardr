import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  winSize: number[];
  winPos: number[];
  isMaximised = false;

  constructor(private electron: ElectronService) {

  }

  ngOnInit() {
  }

  Minimise() {
    this.electron.remote.getCurrentWindow().minimize();
  }

  Maximise() {
    if (!this.isMaximised) {
      this.winSize = this.electron.remote.getCurrentWindow().getSize();
      this.winPos = this.electron.remote.getCurrentWindow().getPosition();
      this.electron.remote.getCurrentWindow().maximize();
      this.isMaximised = true;
    } else {
      this.electron.remote.getCurrentWindow().setPosition(this.winPos[0], this.winPos[1], true);
      this.electron.remote.getCurrentWindow().setSize(this.winSize[0], this.winSize[1], true);
      this.isMaximised = false;
    }
    console.log(this.electron.remote.getCurrentWindow().isMaximized());
  }

  Exit() {
    this.electron.process.exit();

  }
}
