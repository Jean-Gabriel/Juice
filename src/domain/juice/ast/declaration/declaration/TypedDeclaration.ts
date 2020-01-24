import {Declaration} from "../Declaration";
import {JuiceType} from "../../../types/JuiceTypes";
import {Identifier} from "../../expression/expressions/IdentifierExpression";

export class TypedDeclaration implements Declaration {
    constructor(private name: Identifier, private type: JuiceType) {}
}
