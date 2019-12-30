import { Observable } from 'rxjs';
import { map, reduce,  } from 'rxjs/operators';
import { Block, SingleRecord, SRecord } from './type';
import { SRecordStorage } from './srecord-storage';
import { SingleReader } from './single-reader';

export const str2srec = () => ( src: Observable<string> ) => {
  const singleReader = new SingleReader();
  return src.pipe( 
    map( record => singleReader.fromRecord( record ) ),
    reduce( ( storage: SRecordStorage, rec: SingleRecord ) => {
      storage.store( rec );
      return storage;
    }, new SRecordStorage() ),
    map( srec => srec.toSRecord() ) );
};
