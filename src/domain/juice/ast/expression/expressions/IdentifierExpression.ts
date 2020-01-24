import {Expression} from "../Expression";

export type Identifier = string;

export class IdentifierExpression implements Expression {
    constructor(private identifier: Identifier) {}
}

