import * as fs from 'fs';
import * as  path from 'path';
import { fromEvent } from 'rxjs';

const scanDir = async ( root: string, test: ( dirent: fs.Dirent, parentPath: string ) => boolean ) => {
  const matches: string[] = [];   // 条件にマッチするパス
  
  // 子階層のファイルを探す関数
  const scanChildDir = async ( parentPath: string ) => {
    const dir = await fs.promises.opendir( parentPath );
    const childPaths: string[] = [];
    
    // asyncIterator を使ったdirent(directory entry)のループ
    for await ( const dirent of dir ) {
      const childPath = path.join( dir.path, dirent.name );
      
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



const getTsFiles = async ( path: string ) => {
  const tsfiles = await scanDir( path, ( dirent ) => /.+\.ts$/.test( dirent.name ) );
  console.log( tsfiles )  
}
getTsFiles( 'I:\\NodeWS2\\practice\\ci\\client\\src' );



import * as child_process from 'child_process';
const cmd = child_process.exec( 'cmd', { timeout: 5000 } );

import { take, takeUntil } from 'rxjs/operators'
const terminate = fromEvent<[number,string]>( cmd, 'exit' );
const stdout = fromEvent<Buffer>( cmd.stdout, 'data' ).pipe( takeUntil( terminate ) );
const stderr = fromEvent<Buffer>( cmd.stderr, 'data' ).pipe( takeUntil( terminate ) );

stdout.subscribe( msg => console.log( msg ) );
stderr.subscribe( msg => console.error( msg ) );

// コードかシグナルが返ってくる…とも限らない適当
terminate.subscribe( ( [ code, signal ] ) => { console.log( code ? code : signal ) } );