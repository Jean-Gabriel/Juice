import {Declaration} from "../Declaration";
import {Identifier} from "../../expression/expressions/IdentifierExpression";
import {Statement} from "../../statement/Statement";
import {TypedDeclaration} from "./TypedDeclaration";
import {JuiceType} from "../../../../types/JuiceTypes";

export class FunctionDeclaration implements Declaration {
    constructor(private identifier: Identifier,
                private args: TypedDeclaration[] = [],
                private returnType: JuiceType,
                private body: Statement[] = []) {}
}
