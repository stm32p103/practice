import { UniqueEntityID } from "../unique-entity-id";

export interface DomainEvent {
  occuredAt: Date;
  getAggregateId (): UniqueEntityID;
}
