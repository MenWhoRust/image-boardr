import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit {

  @Input()
  previewUrl: string;

  @Input()
  fileUrl: string;

  @Input()
  id: number;

  @Input()
  tags: string;

  tagsArray: string[];

  isOpen = false;
  isHovered = false;

  constructor(private electron: ElectronService) {
  }

  ngOnInit() {
    this.tagsArray = this.tags.split(' ');
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  openModal() {
    document.getElementById('myModal-' + this.id).style.display = 'flex';
    this.isOpen = true;
  }

  closeModal() {
    document.getElementById('myModal-' + this.id).style.display = 'none';
    this.isOpen = false;
  }

}
