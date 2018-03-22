import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {XmlParserService} from './xml-parser.service';
import {retry, switchMap} from 'rxjs/operators';


@Injectable()
export class GetPostsService {

  constructor(private  http: HttpClient, private parser: XmlParserService) {
  }

  getPosts<T>(pageSize: number, page: number, tags: string, rating: string) {
    return this.http.get(`https://konachan.com/post.xml?limit=${pageSize}&page=${page}&tags=${rating}+${tags}`, {responseType: 'text'})
      .pipe(retry(5))
      .pipe(switchMap(x => this.parser.ParseXml<T>(x)));
  }
}

