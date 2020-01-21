import {Expression} from "../../Expression/Expression";
import {Declaration} from "../Declaration";
import {Statement} from "../../Statement/Statement";

export class ValDeclaration implements Declaration, Statement {
    constructor(private identifier: string, private expression: Expression) {}
}
