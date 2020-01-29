// ファイルをダウンロードする
import * as fs from 'fs';
import { fromEvent, from } from 'rxjs';
import { throwError, merge, Observable, iif, of, concat } from 'rxjs';
import { takeUntil, tap, last, flatMap, catchError } from 'rxjs/operators';
import { get, Response, CoreOptions } from 'request';

import { downloadFileObservable, createDirObservable } from './snipet';
import { join, dirname } from 'path';
import { credential } from './credential';

const downloads = [
  { dst: './test/test1.txt', url: 'http://localhost/repos/sample/a00-00/sample.txt' },
  { dst: './a/b/c/test2.txt', url: 'http://localhost/repos/日本語/空白を含むパス ←/テスト(URLがどうなるか).txt' },
  { dst: './a/b/test3.txt', url: 'http://localhost/repos/日本語/空白を含むパス ←/テスト(URLがどうなるか).txt' },
  { dst: './a/test4.txt', url: 'http://localhost/repos/日本語/空白を含むパ0ス ←/テスト(URLがどうなるか).txt' },
  { dst: './test/test5.txt', url: 'http://localhost/repos/日本語/空白を含むパス ←/テスト(URLがどうなるか).txt' },
  { dst: './a/test6.txt', url: 'http://localhost/repos/日本語/空白を含むパス ←/テスト(URLがどうなるか).txt' }
];

const options = {
  auth: {
    user: credential.user,
    password: credential.password
  }
}

concat( 
  // 全てのDL対象に対してフォルダを作成する
  from( downloads ).pipe( flatMap( dl => createDirObservable( dirname( dl.dst ) ) ) ), 
  // ダウンロードする
  from( downloads ).pipe( flatMap( dl => downloadFileObservable( dl.dst, encodeURI( dl.url ), options ) ) )
).pipe( catchError( err => of( err ) ) ).subscribe();



