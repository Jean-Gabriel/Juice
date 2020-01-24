export class Point {
    constructor(private x: number, private y: number) {}

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
