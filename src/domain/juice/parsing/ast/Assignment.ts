import {Expression} from "./expression/Expression";
import {Statement} from "./statement/Statement";
import {Accessor} from "./expression/expressions/Accessor";

export class Assignment implements Expression, Statement {
    constructor(private accessor: Accessor, private value: Expression) {}
}
