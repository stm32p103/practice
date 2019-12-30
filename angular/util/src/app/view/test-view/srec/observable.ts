import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { Block, Record } from './type';
import { SRecord } from './srec';
import { Reader } from './reader';

export const str2srec = () => ( src: Observable<string> ) => {
  const reader = new Reader();
  const srec = new SRecord();
  return src.pipe( map( record => reader.fromRecord( record ) ), reduce( ( srec: SRecord, rec: Record ) => {
    srec.append( rec );
    return srec;
  }, srec) );
};