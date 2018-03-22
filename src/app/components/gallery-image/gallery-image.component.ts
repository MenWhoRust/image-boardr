import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Post} from '../../types/IKonachan';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css'],
  animations: [
    trigger('animateHovered', [
      state('false', style({opacity: 0})),
      state('true', style({opacity: 1})),
      transition('false <=> true', [
        animate(250)
      ])
    ]),
    trigger('animateLoaded', [
      state('false', style({opacity: 0})),
      state('true', style({opacity: 1})),
      transition('false <=> true', [
        animate(250)
      ])
    ])
  ]
})
export class GalleryImageComponent implements OnInit {

  @Input()
  post: Post;

  isHovered = false;
  isLoaded = false;

  constructor(private electron: ElectronService) {
  }

  ngOnInit() {
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  hideDlButton() {
    this.isHovered = false;

  }

  showDlButton() {
    this.isHovered = true;
  }

}
