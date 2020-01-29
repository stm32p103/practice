import { Observable, fromEvent, throwError, merge, empty } from 'rxjs';
import { map, tap, take, flatMap, observeOn, takeUntil, share } from 'rxjs/operators';
import { FileReaderObservable } from './file-reader-observable';



// ファイルの読み込みをするだけのOperator
// 何らかの理由で中断したら例外を投げる
export const readAsText = () => ( src: Observable<File> ) => {
  return src.pipe(
    flatMap( file => {
      const obs = new FileReaderObservable();
      const failed = merge( obs.onAbort, obs.onError ).pipe( flatMap( evt => throwError( `Cannot read file. ${file.name}.` ) ) );
      const data = obs.onLoad.pipe( map( evt => ( evt as any ).target.result as string ) );
      
      obs.reader.readAsText( file );
      return merge( data, failed ).pipe( takeUntil( obs.onLoadEnd ) );
    } )
  );
}

//export const readAsArrayBuffer = ( maxSize: number ) => ( src: Observable<File> ) => {
//  return src.pipe(
//    flatMap( file => {
//      let loaded = 0;
//      const obs = new FileReaderObservable();
//      
//      const read = ( start: number ) => {
//        obs.reader.readAsArrayBuffer( file.slice( start, Math.min( file.size, maxSize + start ) ) );
//      };
//      
//      const abort = merge( obs.onAbort, obs.onError ).pipe( flatMap( evt => throwError( `Cannot read file. ${file.name}.` ) ) );
//      
//      const data = obs.onLoad.pipe(
//        map( evt => {
//          const res = ( evt as any ).target.result as ArrayBuffer;
//          loaded += evt.loaded;
//          if( loaded < file.size ) {  
//            read( loaded );
//          }
//          return res;
//        } ),
//        share()
//      );
//      
//      const finish = data.pipe( flatMap( () => {
//        if( loaded >= file.size ) {
//          return empty();
//        }
//      } ) );
//      
//      return merge( data, abort ).pipe( takeUntil( finish ) );
//    } )
//  );
//}
