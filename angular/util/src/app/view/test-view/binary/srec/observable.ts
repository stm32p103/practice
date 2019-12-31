import { Observable, from } from 'rxjs';
import { map, tap, takeLast, flatMap } from 'rxjs/operators';
import { SRecord } from './type';
import { SRecordReader } from './srecord-reader';
import { SRecordWriter, SRecordWriteOption } from './srecord-writer';

/* ############################################################################
 * 1行ずつレコードの文字列を受け取り、最終的なSRecordを出力するOperator
 * ######################################################################### */
export const str2srec = () => ( src: Observable<string> ) => {
  const reader = new SRecordReader();
  return src.pipe( 
    tap( record => reader.read( record ) ),
    takeLast( 1 ),
    map( () => reader.toSRecord() ) );
};

/* ############################################################################
 * SRecordを1行ずつの文字列として出力するOperator
 * ######################################################################### */
export const srec2str = ( option: SRecordWriteOption = {} ) => {
  return ( src: Observable<SRecord> ) => {
    return src.pipe( flatMap( srec => from( new SRecordWriter( srec, option ) ) ) );
  }
};
