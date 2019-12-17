import { BaselineKey } from './baseline';

export class TaskKey {
  constructor( readonly key: string ) {}  
}
//
//export enum TaskStateEnum {
//  Todo,
//  OnGoing,
//  Done
//}

export class Task {
//  private _state: TaskStateEnum = TaskStateEnum.Todo;
  constructor( 
    public readonly key: TaskKey,
    public contained: BaselineKey ) {
  }

//  public get state() { return this._state }
//  rescheduleTo( baseline: BaselineKey ) {
//    this.contained = baseline;
//  }
//  
//  reset() {
//    this._state = TaskStateEnum.Todo;
//  }
//  
//  start() {
//    this._state = TaskStateEnum.OnGoing;
//  }
//  
//  complete() {
//    this._state = TaskStateEnum.Done;
//  }
}

// あくまで構成管理のコンテキストでのタスクを表すので、タスク自体の細かい管理は外部にゆだねる

// やってはいけないtaskの状態遷移はタスク内部では判断しきれないのでドメインサービスにより監視すべき (集約の外の話)
// タスク自体は、名前はどうあれ todo, on going, done に分類できる。

// "レビュー中"が存在しないのは、レビューはタスクそのものではなく、成果物に対して行うから。

// これらの状態の遷移は、ワークフローと無関係に自由に行えるようにする。
// 遷移自体は何らかの理由があってするもので、Task単体ではにその良し悪しは判断できないから。

// レビューとの関係も特にない
// タスクに紐づく変更セットが、タスクから導出されるかもしれないものの、その関係はここでは重要ではない