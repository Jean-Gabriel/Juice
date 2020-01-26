import {Expression} from "../Expression";
import {Identifier} from "./IdentifierExpression";

export class ObjectInstantiation implements Expression {
    constructor(private readonly identifier: Identifier) {}
}
