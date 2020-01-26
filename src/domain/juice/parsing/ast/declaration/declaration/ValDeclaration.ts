import {Expression} from "../../expression/Expression";
import {Declaration} from "../Declaration";
import {Statement} from "../../statement/Statement";

export class ValDeclaration implements Declaration, Statement {
    constructor(private identifier: string, private expression: Expression) {}
}
