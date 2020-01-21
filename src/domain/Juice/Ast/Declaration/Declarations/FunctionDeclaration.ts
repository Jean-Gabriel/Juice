import {Declaration} from "../Declaration";
import {Identifier} from "../../Expression/Expressions/IdentifierExpression";
import {Statement} from "../../Statement/Statement";
import {TypedDeclaration} from "./TypedDeclaration";

export class FunctionDeclaration implements Declaration {
    constructor(private identifier: Identifier, private args: TypedDeclaration[] = [], private body: Statement[] = []) {}
}
