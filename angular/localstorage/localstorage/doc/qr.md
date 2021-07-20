

# エラー対策
ブラウザで動作するプログラムを書いていると、`Uncaught ReferenceError: Buffer is not defined`というエラーが起きることがある。これは、ブラウザに存在しない`Buffer`を参照しているために起きているとのこと。

`polyfill.ts`に以下の修正を追加し、`@types/node`の型情報を追加すればエラーは起きなくなる([参考](https://newbedev.com/angular-6-uncaught-referenceerror-buffer-is-not-defined
))。

```typescript
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
```

型情報の追加は`npm install @types/node`でNode.jsの型情報をインストールし、`tsconfig.json`(Angularの場合`tsconfig.app.json`)に以下を追加すればよい。

```json
    "types": [
      "node"
    ]
```