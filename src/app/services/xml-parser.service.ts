import {Injectable} from '@angular/core';
import {parseString} from 'xml2js';

@Injectable()
export class XmlParserService {

  constructor() {
  }

  ParseXml<T>(xml: string) {
    return new Promise<T>(resolve => {
      parseString(xml, {mergeAttrs: true, explicitArray: false}, (err, result: T) => {
        resolve(result);
      });
    });
  }
}
