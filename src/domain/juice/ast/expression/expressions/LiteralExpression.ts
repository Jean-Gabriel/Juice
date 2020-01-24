import {Expression} from "../Expression";
import {Token} from "../../../token/Token";

type LiteralValue = Token | null ;

export class LiteralExpression implements Expression {
    constructor(private value: LiteralValue) {}
}
