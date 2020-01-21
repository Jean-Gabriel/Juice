import {Statement} from "../Statement";
import {Expression} from "../../Expression/Expression";

export class ReturnStatement implements Statement {
    constructor(private expression: Expression) {}
}
