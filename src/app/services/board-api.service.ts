import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {XmlParserService} from './xml-parser.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import {SearchTerms} from '../types/SearchTerms';


@Injectable()
export class BoardApiService {

  constructor(private  http: HttpClient, private parser: XmlParserService) {
  }

  // Generic get posts method
  // TODO: need to check what type is passed and change the url appropriately for other image boards
  // TODO: Some apis do not return XML, need a workaround
  getPosts<T>(searchTerms: SearchTerms, page: number): Promise<T> {
    const safeString = searchTerms.tags.replace(' ', '+').replace('&', '%26');
    return this.http.get(
      `https://konachan.com/post.xml?limit=${searchTerms.pageSize}&page=${page}&tags=${searchTerms.getRatingString}+${safeString}`,
      {responseType: 'text'})
      .map(x => this.parser.ParseXml<T>(x))
      .toPromise();
  }

  getComments<T>(postId: number): Promise<T> {
    return this.http.get<T>(
      `https://konachan.com/comment.json?post_id=${postId}`)
      .toPromise();
  }

  postComment<T>(postId: number, isAnonymous: boolean, commentBody: string, login: string, passwordHash: string) {
    return this.http.post<T>(
      `https://konachan/comment.json?
      post_id=${postId}
      &anonymous=${isAnonymous ? 1 : 0}
      &body=${commentBody}
      &login=${login}
      &password_hash=${passwordHash}`,
      null
    );
  }
}

