import {Statement} from "../Statement";
import {Expression} from "../../expression/Expression";

export class PrintStatement implements Statement {
    constructor(private expression: Expression) {}
}
