import {StringReader} from "../../../utils/StringReader";
import {provideTestReporter} from "../../../../infrastructure/juice/reporter/TestReporter";
import {Tokenizer} from "../../token/Tokenizer";
import {Parser} from "../Parser";
import {TokenReader} from "../../token/TokenReader";
import {Token} from "../../token/Token";
import {ValDeclaration} from "../ast/declaration/declaration/ValDeclaration";
import {FunctionCall} from "../ast/FunctionCall";
import {Accessor} from "../ast/expression/expressions/Accessor";
import {Program} from "../ast/declaration/Program";
import {BinaryExpression} from "../ast/expression/expressions/BinaryExpression";
import {LiteralExpression} from "../ast/expression/expressions/LiteralExpression";
import {UnaryExpression} from "../ast/expression/expressions/UnaryExpression";

describe('Parser', () => {
    let reporter = provideTestReporter();

    beforeEach(() =>  {
        reporter = provideTestReporter();
    });

    describe('when encountering a val declaration', () => {
        it('should parse val declaration with function', () => {
            expectAstEqual('val test = returnTwo()', new Program([
                new ValDeclaration('test', new FunctionCall(new Accessor('returnTwo')))
                ])
            );
        });

        it('should parse val declaration with binary expression', () => {
            expectAstEqual('val test = 2 + -2', new Program([
                new ValDeclaration('test',
                    new BinaryExpression(
                        new LiteralExpression('2'), '+', new UnaryExpression('-', new LiteralExpression('2'))
                    )
                )])
            );
        });

        it('should parse val declaration with other val', () => {
            expectAstEqual('val test = other.value', new Program([
                new ValDeclaration('test',
                    new Accessor('other', new Accessor('value')))
            ]));
        });

        it('should parse val declaration with multiple expression', () => {
            expectAstEqual('val test = other.value + 2 + returnTwo()', new Program([
                new ValDeclaration('test',
                    new BinaryExpression(
                        new BinaryExpression(
                            new Accessor('other',
                                new Accessor('value')), '+',
                            new LiteralExpression('2')), '+',
                        new FunctionCall(
                            new Accessor('returnTwo')
                        )
                    )
                )
            ]));
        });

        it('should not parse val declaration without equality', () => {

        });
    });

    function expectAstEqual(content: string, expectedAst: Program) {
        const parser = provideParserFor(content);
        const ast = parser.parse();

        expect(ast).toEqual(expectedAst);
    }

    function provideParserFor(content: string) {
        const tokens = tokenize(content);
        return new Parser(provideTokenReaderFor(tokens));
    }

    function provideTokenReaderFor(tokens: Token[]) {
        return new TokenReader(tokens);
    }

    function provideStringReaderFor(content: string) {
        return new StringReader(content);
    }

    function tokenize(content: string) {
        return new Tokenizer(provideStringReaderFor(content), reporter).tokenize();
    }
});
