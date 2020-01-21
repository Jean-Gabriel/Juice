import {Declaration} from "../Declaration";
import {Identifier} from "../../Expression/Expressions/IdentifierExpression";
import {TypedDeclaration} from "./TypedDeclaration";

export class ObjectDeclaration implements Declaration {
    constructor(private name: Identifier, private attributes: TypedDeclaration[]) {}
}
