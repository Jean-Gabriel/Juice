import {Statement} from "../Statement";
import {Expression} from "../../expression/Expression";
import {Emitter} from "../../../../emitter/Emitter";

export class ReturnStatement implements Statement {
    constructor(private expression: Expression) {}

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitReturnStatement(this);
    }
}
