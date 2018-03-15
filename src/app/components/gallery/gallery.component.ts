import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {GetPostsService} from '../../services/getposts.service';
import {Konachan, Post} from '../../types/IKonachan';
import {ElectronService} from 'ngx-electron';
import {LightboxComponent} from '../lightbox/lightbox.component';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],

})
export class GalleryComponent implements OnInit {
  @ViewChild('galleryContainer', {read: ViewContainerRef})
  container;


  xml: Post[];
  page = 1;
  pageSize = 50;
  tags = '';
  rating = 'rating:s';


  totalItems: number;


  constructor(private getPosts: GetPostsService, private electron: ElectronService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.getPosts.getPosts<Konachan>(this.pageSize, this.page, this.tags, this.rating)
      .subscribe((response) => {
        this.xml = response.posts.post;
        this.totalItems = response.posts.count;
      });

  }

  goToPage(page: number) {
    this.getPosts.getPosts<Konachan>(this.pageSize, page, this.tags, this.rating)
      .subscribe((response) => {
        this.xml = response.posts.post;
        this.page = page;
      });
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  createLightbox(fileUrl: string, tags: string) {
    this.container.clear();
    const factory: ComponentFactory<LightboxComponent> = this.resolver.resolveComponentFactory(LightboxComponent);
    const component: ComponentRef<LightboxComponent> = this.container.createComponent(factory);
    component.instance.fileUrl = fileUrl;
    component.instance.tags = tags.split(' ');
    component.instance.destroyCheck
      .subscribe(v => {
        if (v === 'kill me') {
          component.destroy();
        }
      });
  }

  hideDlButton(id: number) {
    document.getElementById('dl-button-' + id).style.display = 'none';
  }

  showDlButton(id: number) {
    document.getElementById('dl-button-' + id).style.display = 'flex';
  }
}
