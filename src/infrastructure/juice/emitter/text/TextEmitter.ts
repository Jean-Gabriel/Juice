import {Emitter} from "../../../../domain/juice/emitter/Emitter";
import {Program} from "../../../../domain/juice/parsing/ast/declaration/Program";
import {FunctionDeclaration} from "../../../../domain/juice/parsing/ast/declaration/declaration/FunctionDeclaration";
import {TypedDeclaration} from "../../../../domain/juice/parsing/ast/declaration/declaration/TypedDeclaration";
import {ObjectDeclaration} from "../../../../domain/juice/parsing/ast/declaration/declaration/ObjectDeclaration";
import {ValDeclaration} from "../../../../domain/juice/parsing/ast/declaration/declaration/ValDeclaration";
import {UnaryExpression} from "../../../../domain/juice/parsing/ast/expression/expressions/UnaryExpression";
import {ReturnStatement} from "../../../../domain/juice/parsing/ast/statement/statements/ReturnStatement";
import {PrintStatement} from "../../../../domain/juice/parsing/ast/statement/statements/PrintStatement";
import {ObjectInstantiation} from "../../../../domain/juice/parsing/ast/expression/expressions/ObjectInstantiation";
import {LiteralExpression} from "../../../../domain/juice/parsing/ast/expression/expressions/LiteralExpression";
import {IdentifierExpression} from "../../../../domain/juice/parsing/ast/expression/expressions/IdentifierExpression";
import {FunctionCall} from "../../../../domain/juice/parsing/ast/FunctionCall";
import {BinaryExpression} from "../../../../domain/juice/parsing/ast/expression/expressions/BinaryExpression";
import {Accessor} from "../../../../domain/juice/parsing/ast/expression/expressions/Accessor";
import {Assignment} from "../../../../domain/juice/parsing/ast/Assignment";

export class TextEmitter implements Emitter<String> {
    private indentLevel = 0;
    private indentSize = 4;

    emit(program: Program): String {
        return program.visit(this);
    }

    emitProgram(program: Program): String {
        let content = "";
        for(const declaration of program.getContent()) {
            content += declaration.visit(this);
        }
        return content;
    }

    emitFunctionDeclaration(declaration: FunctionDeclaration): String {
        let emittedDeclaration = `(Function) ${declaration.getIdentifier()} \n`;

        this.indentLevel++;
        for(const statement of declaration.getBody()) {
            emittedDeclaration += `${this.getIndent()} ${statement.visit(this)} \n`;
        }

        this.indentLevel--;
        return emittedDeclaration;
    }

    getIndent() {
        let indent = "";

        for(let i = 0;i < this.indentLevel * this.indentSize;i++) {
            indent += " ";
        }

        return indent;
    }

    emitObjectDeclaration(declaration: ObjectDeclaration): String {
        let emittedObjectDeclaration = `(Object declaration) ${declaration.getName()} \n`;

        this.indentLevel++;
        for(const attribute of declaration.getAttributes()) {
            emittedObjectDeclaration += `${this.getIndent()} (Object attribute) ${attribute.visit(this)}\n`;
        }
        this.indentLevel--;

        return emittedObjectDeclaration;
    }

    emitTypedDeclaration(declaration: TypedDeclaration): String {
        return `${declaration.getName()} -> ${declaration.getType()}`;
    }


    emitValDeclaration(declaration: ValDeclaration): String {
        return `(Val declaration) ${declaration.getIdentifier()} -> ${declaration.getExpression().visit(this)}`;
    }

    emitAccessor(accessor: Accessor): String {
        return `(Val accessor) ${accessor.getIdentifier()}`;
    }

    emitAssignment(assignment: Assignment): String {
        return `(Assignment) ${assignment.getAccessor().getIdentifier()} -> ${assignment.getExpression().visit(this)}`;
    }

    emitBinaryExpression(binary: BinaryExpression): String {
        return `(Binary expression)`;
    }

    emitFunctionCall(call: FunctionCall): String {
        return `(Function call) ${call.getAccessor().getIdentifier()}`;
    }

    emitIdentifier(identifier: IdentifierExpression): String {
        return `(Identifier) ${identifier.getIdentifier()}`;
    }

    emitLiteralExpression(literal: LiteralExpression): String {
        return `(Literal) ${literal.getValue()}`;
    }

    emitObjectInstantiation(instantiation: ObjectInstantiation): String {
        return `(Object instantiation) ${instantiation.getIdentifier()}`;
    }

    emitPrintStatement(statement: PrintStatement): String {
        return `(Print statement)`;
    }

    emitReturnStatement(statement: ReturnStatement): String {
        return `(Return statement)`;
    }

    emitUnaryExpression(unary: UnaryExpression): String {
        return `(Unary expression)`;
    }
}
