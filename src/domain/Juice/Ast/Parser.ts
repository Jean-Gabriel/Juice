import {TokenReader} from "../Token/TokenReader";
import {TokenType} from "../Token/TokenType";
import {BinaryExpression} from "./Expression/Expressions/BinaryExpression";
import {UnaryExpression} from "./Expression/Expressions/UnaryExpression";
import {LiteralExpression} from "./Expression/Expressions/LiteralExpression";
import {Expression} from "./Expression/Expression";
import {Program} from "./Declaration/Program";
import {ValDeclaration} from "./Declaration/Declarations/ValDeclaration";
import {ObjectInstantiation} from "./Expression/Expressions/ObjectInstantiation";
import {PrintStatement} from "./Statement/Statements/PrintStatement";
import {ObjectDeclaration} from "./Declaration/Declarations/ObjectDeclaration";
import {tokenTypeToJuiceType} from "../Types/tokenTypeToJuiceType";
import {FunctionDeclaration} from "./Declaration/Declarations/FunctionDeclaration";
import {Statement} from "./Statement/Statement";
import {ReturnStatement} from "./Statement/Statements/ReturnStatement";
import {Accessor} from "./Expression/Expressions/Accessor";
import {Assignment} from "./Assignment";
import {FunctionCall} from "./FunctionCall";
import {TypedDeclaration} from "./Declaration/Declarations/TypedDeclaration";

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
        if(!this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
            this.report("Expected identifier after fun token");
        }
        const identifier = this.tokenReader.previous().getValue();

        if(!this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_PARENTHESIS)) {
            this.report("Expected left parenthesis after function identifier");
        }

        const args = this.parseTypedValueUntil(this.ARGUMENT_END, this.ARGUMENT_SEPARATOR);
        const body = this.parseFunctionBody();

        return new FunctionDeclaration(identifier, args, body);
    }

    private parseFunctionBody() {
        const body: Statement[] = [];

        if(!this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_BRACKET)) {
            this.report("Expected left bracket after function arguments");
        }

        while(!this.tokenReader.currentTokenTypeMatches(TokenType.RIGHT_BRACKET)) {
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
        if(!this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
            this.report("Expected identifier after obj token");
        }

        const identifier = this.tokenReader.previous().getValue();

        if(!this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_BRACKET)) {
            this.report("Expected left bracket after object identifier");
        }

        const attributes = this.parseTypedValueUntil(this.ATTRIBUTE_END);
        return new ObjectDeclaration(identifier, attributes);
    }

    private parsePrintStatement() {
        this.tokenReader.advance();
        if(!this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_PARENTHESIS)) {
            this.report("Expected left parenthesis after print");
        }

        const expression = this.parseExpression();

        if(!this.tokenReader.currentTokenTypeMatches(TokenType.RIGHT_PARENTHESIS)) {
            this.report("Expected right parenthesis after expression");
        }

        return new PrintStatement(expression);
    }

    private parseValDeclaration() {
        this.tokenReader.advance();

        if(!this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
            this.report("Expected identifier token after val declaration");
        }
        const identifier = this.tokenReader.previous().getValue();

        if(!this.tokenReader.currentTokenTypeMatches(TokenType.EQUAL)) {
            this.report("Expected equal sign after val identifier");
        }

        let expression: Expression;
        if(this.tokenReader.currentTokenTypeMatches(TokenType.NEW)) {
            if(!this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
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

        if(this.tokenReader.currentTokenTypeMatches(TokenType.EQUAL)) {
            const value = this.parseAssignment();

            if(expression instanceof Accessor) {
                return new Assignment(expression, value);
            }
        }

        return expression;
    }

    private parseEquality(): Expression {
        let left = this.parseComparison();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator = this.tokenReader.previous();
            const right = this.parseComparison();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseComparison(): Expression {
        let left = this.parseAddition();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
            const operator = this.tokenReader.previous();
            const right = this.parseAddition();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseAddition(): Expression {
        let left = this.parseMultiplication();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.MINUS, TokenType.PLUS)) {
            const operator = this.tokenReader.previous();
            const right = this.parseMultiplication();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseMultiplication(): Expression{
        let left = this.parseUnary();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.SLASH, TokenType.STAR, TokenType.MODULO)) {
            const operator = this.tokenReader.previous();
            const right = this.parseUnary();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseUnary(): Expression {
        if(this.tokenReader.currentTokenTypeMatchesAny(TokenType.MINUS, TokenType.BANG)) {
            const operator = this.tokenReader.previous();
            const right = this.parseUnary();
            return new UnaryExpression(operator, right);
        }

        return this.parseCall();
    }

    private parseCall() {
        let expression = this.parsePrimary() as Expression;

        if(expression instanceof Accessor) {
            if(this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_PARENTHESIS)) {
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
        if(this.tokenReader.currentTokenTypeMatches(TokenType.NULL)) {
            return new LiteralExpression(null);
        }

        if(this.tokenReader.currentTokenTypeMatchesAny(TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN)) {
            return new LiteralExpression(this.tokenReader.previous());
        }

        if(this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
            return this.parseAccessor();
        }

        if(this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_PARENTHESIS)) {
            const expression = this.parseExpression();

            if(!this.tokenReader.currentTokenTypeMatches(TokenType.RIGHT_PARENTHESIS)) {
                this.report("Expected right parenthesis after primary expression");
            }

            return expression
        }

        this.report("Undefined primary")
    }

    private parseFunctionCallArguments() {
        const args: Expression[] = [];
        while(!this.tokenReader.currentTokenTypeMatches(TokenType.RIGHT_PARENTHESIS)) {
            if(!this.tokenReader.currentTokenTypeMatches(TokenType.COMMA) && args.length) {
                this.report("Expected comma after argument");
            }

            args.push(this.parseExpression());
        }

        return args;
    }

    private parseAccessor() {
        const accessor = new Accessor(this.tokenReader.previous().getValue());
        while(this.tokenReader.currentTokenTypeMatches(TokenType.DOT)) {
            if(!this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
                this.report("Expected identifier after dot");
            }

            accessor.addLowerSubAccessor(new Accessor(this.tokenReader.previous().getValue()));
        }

        return accessor;
    }

    private parseTypedValueUntil(end: TokenType, separator?: Separator) {
        const typedValues: TypedDeclaration[] = [];

        while(!this.tokenReader.currentTokenTypeMatches(end)) {
            if(separator && typedValues.length) {
                if(!this.tokenReader.currentTokenTypeMatches(separator)) {
                    this.report("Typed declaration expects a separator");
                }
            }

            if(!this.tokenReader.currentTokenTypeMatchesAny(TokenType.UINT_TYPE, TokenType.STRING_TYPE, TokenType.BOOLEAN_TYPE)) {
                this.report("Typed declaration expects a type (uint, string or boolean)");
            }

            const nativeType = tokenTypeToJuiceType(this.tokenReader.previous().getType());
            if(!this.tokenReader.currentTokenTypeMatches(TokenType.IDENTIFIER)) {
                this.report("Typed declaration expects an identifier after its type");
            }

            typedValues.push(new TypedDeclaration(this.tokenReader.previous().getValue(), nativeType));
        }

        return typedValues;
    }
}
