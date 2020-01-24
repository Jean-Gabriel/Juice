import {Expression} from "./expression/Expression";
import {Accessor} from "./expression/expressions/Accessor";
import {Statement} from "./statement/Statement";

export class Assignment implements Expression, Statement {
    constructor(private accessor: Accessor, private value: Expression) {}
}
