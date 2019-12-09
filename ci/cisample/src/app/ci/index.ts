
export class BaselineKey {
  constructor( public readonly key: string ) {}
}

export class Baseline {
  key: BaselineKey;
}


export class TaskKey {
  key: string;      // generic string like "jira://{key}"  
}

export class Task {
  key: TaskKey;
  containedBaseline: BaselineKey;
}

export class Effect {
  task: TaskKey;
  item: ConfigurationItemKey;
}

