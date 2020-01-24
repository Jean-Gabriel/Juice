import {Statement} from "../Statement";
import {Expression} from "../../expression/Expression";

export class ReturnStatement implements Statement {
    constructor(private expression: Expression) {}
}
