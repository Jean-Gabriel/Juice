import {Expression} from "../Expression";
import {Emitter} from "../../../../emitter/Emitter";

export type Identifier = string;

export class IdentifierExpression implements Expression {
    constructor(private identifier: Identifier) {}

    getIdentifier() {
        return this.identifier;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitIdentifier(this);
    }
}

