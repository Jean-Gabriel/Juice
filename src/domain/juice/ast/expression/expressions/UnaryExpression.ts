import {Expression} from "../Expression";
import {Token} from "../../../token/Token";

export class UnaryExpression implements Expression {
    constructor(private operator: Token, private right: Expression) {}
}
