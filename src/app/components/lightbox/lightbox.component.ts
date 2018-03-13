import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
    this.tagsArray = this.tags.split(' ');
  }

  openModal(elId) {
    document.getElementById('myModal-' + this.id).style.display = 'flex';
    this.isOpen = true;
  }

  closeModal(elId) {
    document.getElementById('myModal-' + this.id).style.display = 'none';
    this.isOpen = false;
  }

}
