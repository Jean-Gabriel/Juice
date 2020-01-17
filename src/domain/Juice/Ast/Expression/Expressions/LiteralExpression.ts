import {Expression} from "../Expression";
import {Token} from "../../../Token/Token";

type LiteralValue = Token | null ;

export class LiteralExpression implements Expression {
    constructor(private value: LiteralValue) {}
}
