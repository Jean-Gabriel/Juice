import {Expression} from "../Expression";
import {Token} from "../../../../token/Token";
import {Operator} from "./BinaryExpression";

export class UnaryExpression implements Expression {
    constructor(private operator: Operator, private right: Expression) {}
}
