import {Expression} from "../Expression";
import {Token} from "../../../token/Token";

export class BinaryExpression implements Expression {
    constructor(private left: Expression, private operator: Token, private right: Expression) {}
}
