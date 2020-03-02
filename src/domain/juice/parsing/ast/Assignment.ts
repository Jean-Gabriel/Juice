import {Expression} from "./expression/Expression";
import {Statement} from "./statement/Statement";
import {Accessor} from "./expression/expressions/Accessor";
import {Emitter} from "../../emitter/Emitter";

export class Assignment implements Expression, Statement {
    constructor(private accessor: Accessor, private expression: Expression) {}

    getAccessor() {
        return this.accessor;
    }

    getExpression() {
        return this.expression;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitAssignment(this);
    }
}
