import { v4 as uuidv4 } from "uuid";
import { Identifier } from "./identifier";

export class UniqueEntityID extends Identifier<number | string> {
  constructor (id?: number | string) {
    super (id ? id : uuidv4());
  }
}

