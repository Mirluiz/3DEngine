export class Coordinate {

    x: number;
    y: number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    static create(x: number, y: number) {
        let newCoord = new this();
        newCoord.x = x;
        newCoord.y = y;

        return newCoord;
    }

}