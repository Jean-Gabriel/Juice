import {Expression} from "./Expression/Expression";
import {Statement} from "./Statement/Statement";
import {Accessor} from "./Expression/Expressions/Accessor";

export class FunctionCall implements Expression, Statement {
    constructor(private accessor: Accessor, private args: Expression[] = []) {}
}
