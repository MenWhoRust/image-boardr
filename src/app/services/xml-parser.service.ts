import {Injectable} from '@angular/core';
import {parseString} from 'xml2js';

@Injectable()
export class XmlParserService {

  constructor() {
  }

  // Parses XML receive from apis
  ParseXml<T>(xml: string) {
    let xmlResult;
      parseString(xml, {mergeAttrs: true, explicitArray: false}, (err, result: T) => {
        xmlResult = result;
      });
      return xmlResult;
  }
}
