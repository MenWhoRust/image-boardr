import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit, Output,
  ViewContainerRef
} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Post} from '../../types/Konachan';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {LightboxComponent} from '../lightbox/lightbox.component';

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
// TODO: Maybe highlight the current image selected in the lightbox; can use an index for this
export class GalleryImageComponent implements OnInit {

  @Output() lightBoxCreated: EventEmitter<ComponentRef<LightboxComponent>> = new EventEmitter<ComponentRef<LightboxComponent>>();

  @Input()
  post: Post;

  @Input()
  postIndex: number;

  @Input()
  container: ViewContainerRef;

  isHovered = false;
  isLoaded = false;

  constructor(private electron: ElectronService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  createLightbox() {
    this.container.clear();

    const factory: ComponentFactory<LightboxComponent> = this.resolver.resolveComponentFactory(LightboxComponent);
    const component: ComponentRef<LightboxComponent> = this.container.createComponent(factory);

    // Tell the parent that the lightbox has been created
    this.lightBoxCreated.emit(component);

    // Pass the image's index to the lightbox that hopefully has a defined posts variable
    component.instance.index = this.postIndex;
    component.instance.destroyCheck
      .subscribe(v => {
        if (v === 'kill me') {
          component.destroy();
        }
      });
  }
}
