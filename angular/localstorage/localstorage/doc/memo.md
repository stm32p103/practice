
# 棚卸補助用ログツール
予め登録したタイプにマッチしたらロケーション更新

物がどこにあるかをログとして記録する。
通い箱を移動したら

|  スキャン | なし | ロケーション選択中 | コンテナ選択中 |
| ---- | ---- | ---- | ---- |
|  ロケーション  | 場所にロケーションを設定 | 場所にロケーションを設定 | 場所にロケーションを設定 | 
| コンテナ | 場所にコンテナを設定 | コンテナの場所を選択中のロケーションに設定 | 場所にコンテナを設定 | 
| アイテム | - | アイテムの場所を選択中のロケーションに設定 | アイテムの場所を選択中のコンテナに設定 |



# 複数起動の防止
アプリケーションが起動したら、LocalStorageを確認する。


# LocalStorage





現在位置を更新

* ロケーション


## ファイルアップロード
https://blog.angular-university.io/angular-file-upload/

基本形は以下のようなもので、クリックしてファイル選択ダイアログを開いてファイルを選択したら、`onFileSelected`ハンドラが呼び出される。

```html
<input type="file" class="file-upload" onchange="onFileSelected($event))">
```
ファイルの情報は`change`イベントの引数`Event`[イベントハンドラ内部でファイルを参照するときはキャストが必要となる](https://stackoverflow.com/questions/43176560/property-files-does-not-exist-on-type-eventtarget-error-in-typescript/44932086#44932086)。

```typescript
export class AppComponent  {
  onFileSelected( event: Event ) {
    const files = ( <HTMLInputElement>event.target )?.files;
    
    // ファイルがあれば、ファイル名を更新する(ボタンの名前が変わる)
    if ( files ) {
      this.fileName = files[0].name;
    }
  }
}
```

`input`のファイル入力はスタイルが適用しにくいので、`hidden`で非表示にして別のボタンとつなげるのが一般的とのこと。
以下では、`button`の`click`イベントを、非表示の`fileUpload`の`click`イベントに繋いでいる。

```html
<input type="file" hidden (change)="onFileSelected($event)" #fileUpload>
<button mat-raised-button (click)="fileUpload.click()">
  {{fileName || "No file uploaded yet."}}
</button>
```

