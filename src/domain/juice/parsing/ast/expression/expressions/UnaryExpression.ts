import {Expression} from "../Expression";
import {Operator} from "./BinaryExpression";
import {Emitter} from "../../../../emitter/Emitter";

export class UnaryExpression implements Expression {
    constructor(private operator: Operator, private right: Expression) {}

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitUnaryExpression(this);
    }
}
