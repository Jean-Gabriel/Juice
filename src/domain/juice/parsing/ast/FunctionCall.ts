import {Expression} from "./expression/Expression";
import {Statement} from "./statement/Statement";
import {Accessor} from "./expression/expressions/Accessor";
import {Emitter} from "../../emitter/Emitter";

export class FunctionCall implements Expression, Statement {
    constructor(private accessor: Accessor, private args: Expression[] = []) {}

    getAccessor() {
        return this.accessor;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitFunctionCall(this);
    }
}
