import {TokenType} from "../token/TokenType";
import {JuiceType} from "./JuiceTypes";

export function tokenTypeToJuiceType(tokenType: TokenType) {
    switch (tokenType) {
        case TokenType.STRING_TYPE:
            return JuiceType.STRING;
        case TokenType.UINT_TYPE:
            return JuiceType.UINT;
        case TokenType.BOOLEAN_TYPE:
            return JuiceType.BOOLEAN;
        case TokenType.IDENTIFIER:
            return JuiceType.OBJECT;
        default:
            throw new Error("Unsupported type");
    }
}
