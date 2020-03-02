import {Expression} from "../Expression";
import {Emitter} from "../../../../emitter/Emitter";

type LiteralValue = string | null;

export class LiteralExpression implements Expression {
    constructor(private value: LiteralValue) {}

    getValue() {
        return this.value;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitLiteralExpression(this);
    }
}
