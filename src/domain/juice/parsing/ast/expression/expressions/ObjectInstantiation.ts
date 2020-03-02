import {Expression} from "../Expression";
import {Identifier} from "./IdentifierExpression";
import {Emitter} from "../../../../emitter/Emitter";

export class ObjectInstantiation implements Expression {
    constructor(private readonly identifier: Identifier) {}

    getIdentifier() {
        return this.identifier;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitObjectInstantiation(this);
    }
}
