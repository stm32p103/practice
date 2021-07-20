# ブラウザでファイルを開く
[Angularでのファイルアップロードについての解説ページ](https://blog.angular-university.io/angular-file-upload/)を参考に、ファイルをブラウザに読み込ませて開いてみる。

## アップロードボタンを作る
基本形は以下のようになる。ボタンをクリックしてファイル選択ダイアログを開き、ファイルを選択したら`change`イベントハンドラとして指定した`onFileSelected`が呼び出される。

```html
<input type="file" class="file-upload" onchange="onFileSelected($event))">
```
ファイルの情報は`change`イベントの引数から参照できるが、Typescriptでは[キャストしてからでないとアクセスできない](https://stackoverflow.com/questions/43176560/property-files-does-not-exist-on-type-eventtarget-error-in-typescript/44932086#44932086)。

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

## スタイルの適用
`input`のファイル入力はスタイルが適用しにくいので、`hidden`で非表示にして別のボタンとつなげるのが一般的とのこと。
以下では、`input`に`fileUpload`という名前を付け、
`button`の`click`イベントを、非表示の`fileUpload`の`click`イベントにリダイレクトしている。

```html
<input type="file" hidden (change)="onFileSelected($event)" #fileUpload>
<button mat-raised-button (click)="fileUpload.click()">
  {{fileName || "No file uploaded yet."}}
</button>
```

## ファイルを開く







