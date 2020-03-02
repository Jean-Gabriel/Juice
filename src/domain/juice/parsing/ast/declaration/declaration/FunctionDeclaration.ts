import {Declaration} from "../Declaration";
import {Identifier} from "../../expression/expressions/IdentifierExpression";
import {Statement} from "../../statement/Statement";
import {TypedDeclaration} from "./TypedDeclaration";
import {JuiceType} from "../../../../types/JuiceTypes";
import {Emitter} from "../../../../emitter/Emitter";

export class FunctionDeclaration implements Declaration {
    constructor(private identifier: Identifier,
                private args: TypedDeclaration[] = [],
                private returnType: JuiceType,
                private body: Statement[] = []) {}

    getIdentifier() {
        return this.identifier;
    }

    getArguments() {
        return this.args;
    }

    getReturnType() {
        return this.returnType;
    }

    getBody() {
        return this.body;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitFunctionDeclaration(this);
    }
}
