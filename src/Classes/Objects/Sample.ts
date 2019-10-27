export default class Sample {

    points: Array<number>;

    constructor(x:number, y:number, z:number, length: number, width: number, height: number){

        this.points = [
            x, y, z,
            x + length, y, z,
            x, y + width, z,
            x, y + width, z,
            x + length, y, z,
            x + length, y + width, z,

            x, y, z,
            x, y, z + height,
            x, y + width, z,
            x, y + width, z,
            x, y, z + height,
            x, y + width, z + height,

            x, y, z + height,
            x +length, y, z + height,
            x, y + width, z + height,
            x, y + width, z + height,
            x + length, y, z + height,
            x + length, y + width, z + height
        ];
    }
}