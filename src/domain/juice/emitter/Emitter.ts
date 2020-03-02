import {Program} from "../parsing/ast/declaration/Program";
import {FunctionDeclaration} from "../parsing/ast/declaration/declaration/FunctionDeclaration";
import {TypedDeclaration} from "../parsing/ast/declaration/declaration/TypedDeclaration";
import {ValDeclaration} from "../parsing/ast/declaration/declaration/ValDeclaration";
import {ObjectDeclaration} from "../parsing/ast/declaration/declaration/ObjectDeclaration";
import {ReturnStatement} from "../parsing/ast/statement/statements/ReturnStatement";
import {PrintStatement} from "../parsing/ast/statement/statements/PrintStatement";
import {Assignment} from "../parsing/ast/Assignment";
import {FunctionCall} from "../parsing/ast/FunctionCall";
import {Accessor} from "../parsing/ast/expression/expressions/Accessor";
import {BinaryExpression} from "../parsing/ast/expression/expressions/BinaryExpression";
import {IdentifierExpression} from "../parsing/ast/expression/expressions/IdentifierExpression";
import {LiteralExpression} from "../parsing/ast/expression/expressions/LiteralExpression";
import {ObjectInstantiation} from "../parsing/ast/expression/expressions/ObjectInstantiation";
import {UnaryExpression} from "../parsing/ast/expression/expressions/UnaryExpression";

export interface Emitter<T> {
    emit(program: Program): T;

    emitProgram(program: Program): T;
    emitFunctionDeclaration(declaration: FunctionDeclaration): T;
    emitTypedDeclaration(declaration: TypedDeclaration): T;
    emitValDeclaration(declaration: ValDeclaration): T;
    emitObjectDeclaration(declaration: ObjectDeclaration): T;

    emitReturnStatement(statement: ReturnStatement): T;
    emitPrintStatement(statement: PrintStatement): T;

    emitAssignment(assignment: Assignment): T;
    emitFunctionCall(call: FunctionCall): T;

    emitAccessor(accessor: Accessor): T;
    emitBinaryExpression(binary: BinaryExpression): T;
    emitIdentifier(identifier: IdentifierExpression): T;
    emitLiteralExpression(literal: LiteralExpression): T;

    emitObjectInstantiation(instantiation: ObjectInstantiation): T;

    emitUnaryExpression(unary: UnaryExpression): T;
}
