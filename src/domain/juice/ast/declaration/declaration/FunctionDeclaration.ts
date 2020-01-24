import {Declaration} from "../Declaration";
import {Identifier} from "../../expression/expressions/IdentifierExpression";
import {Statement} from "../../statement/Statement";
import {TypedDeclaration} from "./TypedDeclaration";

export class FunctionDeclaration implements Declaration {
    constructor(private identifier: Identifier, private args: TypedDeclaration[] = [], private body: Statement[] = []) {}
}
