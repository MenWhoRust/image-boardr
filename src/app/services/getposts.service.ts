import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {XmlParserService} from './xml-parser.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import {SearchTerms} from '../types/SearchTerms';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class GetPostsService {

  constructor(private  http: HttpClient, private parser: XmlParserService) {
  }

  getPosts<T>(searchTerms: SearchTerms, page: number) {
    return this.http.get(
      `https://konachan.com/post.xml?limit=${searchTerms.pageSize}&page=${page}&tags=${searchTerms.getRatingString}+${searchTerms.tags}`,
      {responseType: 'text'})
      .retry(5)
      .switchMap(x => {
        return this.parser.ParseXml<T>(x);
      });
  }
}

