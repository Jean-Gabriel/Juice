import {TokenType} from "./TokenType";

const keywords = new Map<string, TokenType>();

keywords.set('obj', TokenType.OBJECT);
keywords.set('fun', TokenType.FUNCTION);
keywords.set('null', TokenType.NULL);
keywords.set('return', TokenType.RETURN);
keywords.set('true', TokenType.BOOLEAN);
keywords.set('false', TokenType.BOOLEAN);
keywords.set('val', TokenType.VAL);
keywords.set('and', TokenType.AND);
keywords.set('new', TokenType.NEW);
keywords.set('uint', TokenType.UINT_TYPE);
keywords.set('boolean', TokenType.BOOLEAN_TYPE);
keywords.set('string', TokenType.STRING_TYPE);
keywords.set('print', TokenType.PRINT);

export { keywords };
