import {Expression} from "./expression/Expression";
import {Statement} from "./statement/Statement";
import {Accessor} from "./expression/expressions/Accessor";

export class FunctionCall implements Expression, Statement {
    constructor(private accessor: Accessor, private args: Expression[] = []) {}
}
