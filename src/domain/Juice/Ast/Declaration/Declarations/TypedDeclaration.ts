import {Declaration} from "../Declaration";
import {JuiceType} from "../../../Types/JuiceTypes";
import {Identifier} from "../../Expression/Expressions/IdentifierExpression";

export class TypedDeclaration implements Declaration {
    constructor(private name: Identifier, private type: JuiceType) {}
}
