import * as fs from 'fs';
import { fromEvent, from } from 'rxjs';
import { throwError, merge, Observable, iif, of } from 'rxjs';
import { takeUntil, tap, last, flatMap, catchError } from 'rxjs/operators';
import { get, Response, CoreOptions } from 'request';
import { join, dirname } from 'path';

// 例外を投げる
const throwFrom = <T>( error: Observable<T> ) => {
  return error.pipe( flatMap( err => throwError( err ) ) );
}
// URLをGETするObservable
export const getUrlObservable = ( url: string, options?: CoreOptions ) => {
  const eventTarget = get( url, options );
    
  const response = fromEvent<Response>( eventTarget, 'response' );
  const end = fromEvent<any>( eventTarget, 'end' );
  const error = fromEvent<Response>( eventTarget, 'error' );

  return merge( response.pipe( takeUntil( end ) ), throwFrom( error ) );
};


// ディレクトリを再帰的に作るObservableを返す関数
export const createDirObservable = ( dirpath: string ) => from( fs.promises.mkdir( dirpath, { recursive: true } ) );

// ファイルを削除するObservableを返す関数
export const deleteFileObservable = ( filepath: string ) => from( fs.promises.unlink( filepath ) );

// ファイルをダウンロードするObservableを返す関数
export const downloadFileObservable = ( filepath: string, url: string, options?: CoreOptions ) => {
  let stream = fs.createWriteStream( filepath );
  return fromEvent( stream, 'ready' ).pipe( 
    // GETリクエスト発行
    flatMap( () => getUrlObservable( url, options ) ),
    
    // 応答が成功以外なら例外
    tap( res => {
      console.log( res.statusCode );
      if( res.statusCode != 200 ) {
        throw res.statusMessage;
      }
      res.pipe( stream );
    } ),

    // 例外時はファイルを削除の上、再度例外を投げる
    catchError( ( err ) => {
      stream.close();
      return fromEvent( stream, 'close' ).pipe( 
        flatMap( () => deleteFileObservable( filepath ) ),
        flatMap( () => throwError( err ) )
      )
    } ),

    // 最後はストリームを閉じる
    last(),
    tap( () => {
       stream.close();
    } ) );
}

// 再帰的にフォルダを探索し、パスの配列を返す関数
export const scanDir = async ( root: string, test: ( dirent: fs.Dirent, parentPath: string ) => boolean ) => {
  const matches: string[] = [];   // 条件にマッチするパス
  
  // 子階層のファイルを探す関数
  const scanChildDir = async ( parentPath: string ) => {
    const dir = await fs.promises.opendir( parentPath );
    const childPaths: string[] = [];
    
    // asyncIterator を使ったdirent(directory entry)のループ
    for await ( const dirent of dir ) {
      const childPath = join( dir.path, dirent.name );
      
      if( dirent.isDirectory() ) {
        // ディレクトリなら探索する対象に加える
        childPaths.push( childPath );
      }
      if( test( dirent, dir.path ) ) {
        // 与えられた条件を満たしたらパスを追加
        matches.push( childPath );
      }
    }
    
    // 子階層全てを走査する(再起呼び出し)
    return await Promise.all( childPaths.map( p => scanChildDir( p ) ) );
  }
  
  // rootを起点に走査する
  await scanChildDir( root );
  return matches;
}
