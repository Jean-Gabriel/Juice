import {Expression} from "../Expression";
import {Emitter} from "../../../../emitter/Emitter";

export type Operator = string;

export class BinaryExpression implements Expression {
    constructor(private left: Expression, private operator: Operator, private right: Expression) {}

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitBinaryExpression(this);
    }
}
