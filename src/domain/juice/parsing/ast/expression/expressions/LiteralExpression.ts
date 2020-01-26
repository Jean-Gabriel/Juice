import {Expression} from "../Expression";
import {Token} from "../../../../token/Token";

type LiteralValue = string | null;

export class LiteralExpression implements Expression {
    constructor(private value: LiteralValue) {}
}
