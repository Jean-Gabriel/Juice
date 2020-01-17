import {Expression} from "../Expression";
import {Token} from "../../../Token/Token";

export class UnaryExpression implements Expression {
    constructor(private operator: Token, private right: Expression) {}
}
