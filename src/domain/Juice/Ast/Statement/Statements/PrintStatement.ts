import {Statement} from "../Statement";
import {Expression} from "../../Expression/Expression";

export class PrintStatement implements Statement {
    constructor(private expression: Expression) {}
}
