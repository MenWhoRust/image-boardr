import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {XmlParserService} from './xml-parser.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import {SearchTerms} from '../types/SearchTerms';


@Injectable()
export class GetPostsService {

  constructor(private  http: HttpClient, private parser: XmlParserService) {
  }

  getPosts<T>(searchTerms: SearchTerms, page: number) {
    console.log(page);
    const firstReplace = searchTerms.tags.replace(' ', '+');
    const safeString = firstReplace.replace('&', '%26');
    return this.http.get(
      `https://konachan.com/post.xml?limit=${searchTerms.pageSize}&page=${page}&tags=${searchTerms.getRatingString}+${safeString}`,
      {responseType: 'text'})
      .map(x => this.parser.ParseXml(x))
      .toPromise();
  }
}

