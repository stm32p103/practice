import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { SRecord, SingleRecord } from './type';
import { SRecordReader } from './srecord-reader';
import { SingleReader } from './single-reader';

/* ############################################################################
 * 1行ずつレコードの文字列を受け取り、最終的なSRecordを出力するOperator
 * ######################################################################### */
export const str2srec = () => ( src: Observable<string> ) => {
  const reader = new SingleReader();
  return src.pipe( 
    map( record => reader.fromRecord( record ) ),
    reduce( ( storage: SRecordReader, rec: SingleRecord ) => {
      storage.read( rec );
      return storage;
    }, new SRecordReader() ),
    map( srec => srec.toSRecord() ) );
};
