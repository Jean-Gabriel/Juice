export function isDigit(char: string) {
    return char >= '0' && char <= '9';
}

export function isAlpha(char: string) {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char == '_';
}

export function isAlphaNumeric(char: string) {
    return isDigit(char) || isAlpha(char);
}
