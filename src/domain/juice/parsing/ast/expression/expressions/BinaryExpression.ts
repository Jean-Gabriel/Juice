import {Expression} from "../Expression";
import {Token} from "../../../../token/Token";

export type Operator = string;

export class BinaryExpression implements Expression {
    constructor(private left: Expression, private operator: Operator, private right: Expression) {}
}
