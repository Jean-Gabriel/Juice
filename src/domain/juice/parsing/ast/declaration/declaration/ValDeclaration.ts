import {Expression} from "../../expression/Expression";
import {Declaration} from "../Declaration";
import {Statement} from "../../statement/Statement";
import {Emitter} from "../../../../emitter/Emitter";

export class ValDeclaration implements Declaration, Statement {
    constructor(private identifier: string, private expression: Expression) {}

    getIdentifier() {
        return this.identifier;
    }

    getExpression() {
        return this.expression;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitValDeclaration(this);
    }
}
