import {Expression} from "./Expression/Expression";
import {Accessor} from "./Expression/Expressions/Accessor";
import {Statement} from "./Statement/Statement";

export class Assignment implements Expression, Statement {
    constructor(private accessor: Accessor, private value: Expression) {}
}
