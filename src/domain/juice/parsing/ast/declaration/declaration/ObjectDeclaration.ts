import {Declaration} from "../Declaration";
import {Identifier} from "../../expression/expressions/IdentifierExpression";
import {TypedDeclaration} from "./TypedDeclaration";

export class ObjectDeclaration implements Declaration {
    constructor(private name: Identifier, private attributes: TypedDeclaration[]) {}
}
