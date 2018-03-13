import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {XmlParserService} from './xml-parser.service';
import {switchMap} from 'rxjs/operators';


@Injectable()
export class GetPostsService {

  constructor(private  http: HttpClient, private parser: XmlParserService) {
  }

  getPosts<T>(pageSize: number, page: number, tags: string, rating: string) {
    return this.http.get(`https://konachan.com/post.xml?limit=${pageSize}&page=${page}&tags=${rating}+${tags}`, {responseType: 'text'})
      .pipe(switchMap(x => this.parser.ParseXml<T>(x)));
  }
}

