import {TokenReader} from "../token/TokenReader";
import {TokenType} from "../token/TokenType";
import {BinaryExpression} from "./ast/expression/expressions/BinaryExpression";
import {UnaryExpression} from "./ast/expression/expressions/UnaryExpression";
import {LiteralExpression} from "./ast/expression/expressions/LiteralExpression";
import {Expression} from "./ast/expression/Expression";
import {Program} from "./ast/declaration/Program";
import {ValDeclaration} from "./ast/declaration/declaration/ValDeclaration";
import {ObjectInstantiation} from "./ast/expression/expressions/ObjectInstantiation";
import {PrintStatement} from "./ast/statement/statements/PrintStatement";
import {ObjectDeclaration} from "./ast/declaration/declaration/ObjectDeclaration";
import {tokenTypeToJuiceType} from "../types/tokenTypeToJuiceType";
import {FunctionDeclaration} from "./ast/declaration/declaration/FunctionDeclaration";
import {Statement} from "./ast/statement/Statement";
import {ReturnStatement} from "./ast/statement/statements/ReturnStatement";
import {Accessor} from "./ast/expression/expressions/Accessor";
import {Assignment} from "./ast/Assignment";
import {FunctionCall} from "./ast/FunctionCall";
import {TypedDeclaration} from "./ast/declaration/declaration/TypedDeclaration";

type Separator = TokenType.COMMA;

export class Parser {
    private readonly ATTRIBUTE_END = TokenType.RIGHT_BRACKET;

    private readonly ARGUMENT_SEPARATOR = TokenType.COMMA;
    private readonly ARGUMENT_END = TokenType.RIGHT_PARENTHESIS;

    constructor(private tokenReader: TokenReader) {}

    parse() {
        const program = new Program();
        while(!this.tokenReader.isAtEnd()) {
            switch (this.tokenReader.current().getType()) {
                case TokenType.OBJECT:
                    program.add(this.parseObjectDeclaration());
                    break;
                case TokenType.VAL:
                    program.add(this.parseValDeclaration());
                    break;
                case TokenType.FUNCTION:
                    program.add(this.parseFunctionDeclaration());
                    break;
                case TokenType.PRINT:
                    program.add(this.parsePrintStatement());
                    break;
                case TokenType.IDENTIFIER:
                    program.add(this.parseExpression());
                    break;
                default:
                    this.report("Undefined statement");
            }
        }
        return program;
    }

    private report(error: string) {
        throw new Error(`${error} occurred for: ${this.tokenReader.current().toString()}`);
    }

    private parseFunctionDeclaration() {
        this.tokenReader.advance();
        if(!this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
            this.report("Expected identifier after fun token");
        }
        const identifier = this.tokenReader.previous().getValue();

        if(!this.tokenReader.doTokenTypeMatch(TokenType.LEFT_PARENTHESIS).result()) {
            this.report("Expected left parenthesis after function identifier");
        }

        const args = this.parseTypedValueUntil(this.ARGUMENT_END, this.ARGUMENT_SEPARATOR);
        const body = this.parseFunctionBody();

        return new FunctionDeclaration(identifier, args, body);
    }

    private parseFunctionBody() {
        const body: Statement[] = [];

        if(!this.tokenReader.doTokenTypeMatch(TokenType.LEFT_BRACKET).result()) {
            this.report("Expected left bracket after function arguments");
        }

        while(!this.tokenReader.doTokenTypeMatch(TokenType.RIGHT_BRACKET).result()) {
            const statement = this.parseStatement();
            if(statement) {
                body.push(statement);
            }
        }

        return body;
    }

    private parseStatement() {
        switch (this.tokenReader.currentType()) {
            case TokenType.VAL:
                return this.parseValDeclaration();
            case TokenType.RETURN:
                return this.parseReturn();
            case TokenType.PRINT:
                return this.parsePrintStatement();
            case TokenType.IDENTIFIER:
                return this.parseExpression();
            default:
                this.report("Expected statement in function body");
        }
    }

    private parseReturn() {
        this.tokenReader.advance();
        const expression = this.parseExpression();

        return new ReturnStatement(expression);
    }

    private parseObjectDeclaration() {
        this.tokenReader.advance();
        if(!this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
            this.report("Expected identifier after obj token");
        }

        const identifier = this.tokenReader.previous().getValue();

        if(!this.tokenReader.doTokenTypeMatch(TokenType.LEFT_BRACKET).result()) {
            this.report("Expected left bracket after object identifier");
        }

        const attributes = this.parseTypedValueUntil(this.ATTRIBUTE_END);
        return new ObjectDeclaration(identifier, attributes);
    }

    private parsePrintStatement() {
        this.tokenReader.advance();
        if(!this.tokenReader.doTokenTypeMatch(TokenType.LEFT_PARENTHESIS).result()) {
            this.report("Expected left parenthesis after print");
        }

        const expression = this.parseExpression();

        if(!this.tokenReader.doTokenTypeMatch(TokenType.RIGHT_PARENTHESIS).result()) {
            this.report("Expected right parenthesis after expression");
        }

        return new PrintStatement(expression);
    }

    private parseValDeclaration() {
        this.tokenReader.advance();

        if(!this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
            this.report("Expected identifier token after val declaration");
        }
        const identifier = this.tokenReader.previous().getValue();

        if(!this.tokenReader.doTokenTypeMatch(TokenType.EQUAL).result()) {
            this.report("Expected equal sign after val identifier");
        }

        let expression: Expression;
        if(this.tokenReader.doTokenTypeMatch(TokenType.NEW).result()) {
            if(!this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
                this.report("Expected identifier after new keyword");
            }

            expression = new ObjectInstantiation(this.tokenReader.previous().getValue());
        } else {
            expression = this.parseExpression();
        }

        return new ValDeclaration(identifier, expression);
    }

    private parseExpression(): Expression {
        return this.parseAssignment();
    }

    private parseAssignment(): Expression {
        const expression = this.parseEquality();

        if(this.tokenReader.doTokenTypeMatch(TokenType.EQUAL).result()) {
            const value = this.parseAssignment();

            if(expression instanceof Accessor) {
                return new Assignment(expression, value);
            }
        }

        return expression;
    }

    private parseEquality(): Expression {
        let left = this.parseComparison();

        while(this.tokenReader.doTokenTypeMatchAny(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL).result()) {
            const operator = this.tokenReader.previous();
            const right = this.parseComparison();
            left = new BinaryExpression(left, operator.getValue(), right);
        }

        return left;
    }

    private parseComparison(): Expression {
        let left = this.parseAddition();

        while(this.tokenReader.doTokenTypeMatchAny(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL).result()) {
            const operator = this.tokenReader.previous();
            const right = this.parseAddition();
            left = new BinaryExpression(left, operator.getValue(), right);
        }

        return left;
    }

    private parseAddition(): Expression {
        let left = this.parseMultiplication();

        while(this.tokenReader.doTokenTypeMatchAny(TokenType.MINUS, TokenType.PLUS).result()) {
            const operator = this.tokenReader.previous();
            const right = this.parseMultiplication();
            left = new BinaryExpression(left, operator.getValue(), right);
        }

        return left;
    }

    private parseMultiplication(): Expression{
        let left = this.parseUnary();

        while(this.tokenReader.doTokenTypeMatchAny(TokenType.SLASH, TokenType.STAR, TokenType.MODULO).result()) {
            const operator = this.tokenReader.previous();
            const right = this.parseUnary();
            left = new BinaryExpression(left, operator.getValue(), right);
        }

        return left;
    }

    private parseUnary(): Expression {
        if(this.tokenReader.doTokenTypeMatchAny(TokenType.MINUS, TokenType.BANG).result()) {
            const operator = this.tokenReader.previous();
            const right = this.parseUnary();
            return new UnaryExpression(operator.getValue(), right);
        }

        return this.parseCall();
    }

    private parseCall() {
        let expression = this.parsePrimary() as Expression;

        if(expression instanceof Accessor) {
            if(this.tokenReader.doTokenTypeMatch(TokenType.LEFT_PARENTHESIS).result()) {
                return this.parseFunctionCall(expression as Accessor);
            }
        }

        return expression;
    }

    private parseFunctionCall(accessor: Accessor) {
        const args = this.parseFunctionCallArguments();
        return new FunctionCall(accessor, args);
    }

    private parsePrimary() {
        if(this.tokenReader.doTokenTypeMatch(TokenType.NULL).result()) {
            return new LiteralExpression(null);
        }

        if(this.tokenReader.doTokenTypeMatchAny(TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN).result()) {
            return new LiteralExpression(this.tokenReader.previous().getValue());
        }

        if(this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
            return this.parseAccessor();
        }

        if(this.tokenReader.doTokenTypeMatch(TokenType.LEFT_PARENTHESIS).result()) {
            const expression = this.parseExpression();

            if(!this.tokenReader.doTokenTypeMatch(TokenType.RIGHT_PARENTHESIS).result()) {
                this.report("Expected right parenthesis after primary expression");
            }

            return expression
        }

        this.report("Undefined primary")
    }

    private parseFunctionCallArguments() {
        const args: Expression[] = [];
        while(!this.tokenReader.doTokenTypeMatch(TokenType.RIGHT_PARENTHESIS).result()) {
            if(!this.tokenReader.doTokenTypeMatch(TokenType.COMMA) && args.length) {
                this.report("Expected comma after argument");
            }

            args.push(this.parseExpression());
        }

        return args;
    }

    private parseAccessor() {
        const accessor = new Accessor(this.tokenReader.previous().getValue());
        while(this.tokenReader.doTokenTypeMatch(TokenType.DOT).result()) {
            if(!this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
                this.report("Expected identifier after dot");
            }

            accessor.addLowerSubAccessor(new Accessor(this.tokenReader.previous().getValue()));
        }

        return accessor;
    }

    private parseTypedValueUntil(end: TokenType, separator?: Separator) {
        const typedValues: TypedDeclaration[] = [];

        while(!this.tokenReader.doTokenTypeMatch(end)) {
            if(separator && typedValues.length) {
                if(!this.tokenReader.doTokenTypeMatch(separator).result()) {
                    this.report("Typed declaration expects a separator");
                }
            }

            if(!this.tokenReader.doTokenTypeMatchAny(TokenType.UINT_TYPE, TokenType.STRING_TYPE, TokenType.BOOLEAN_TYPE).result()) {
                this.report("Typed declaration expects a type (uint, string or boolean)");
            }

            const nativeType = tokenTypeToJuiceType(this.tokenReader.previous().getType());
            if(!this.tokenReader.doTokenTypeMatch(TokenType.IDENTIFIER).result()) {
                this.report("Typed declaration expects an identifier after its type");
            }

            typedValues.push(new TypedDeclaration(this.tokenReader.previous().getValue(), nativeType));
        }

        return typedValues;
    }
}
