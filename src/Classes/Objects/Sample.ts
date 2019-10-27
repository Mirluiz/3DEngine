export default class Sample {

    points: Array<number>;
    color: Array<number>;

    constructor(x:number, y:number, z:number, length: number, width: number, height: number){

        this.points = [
            //closer
            x, y, z,
            x, y + width, z,
            x + length, y, z,
            x, y + width, z,
            x + length, y + width, z,
            x + length, y, z,

            //further
            x, y, z + height,
            x + length, y, z + height,
            x, y + width, z + height,
            x, y + width, z + height,
            x + length, y, z + height,
            x + length, y + width, z + height,

            //left
            x, y, z,
            x, y + width, z + height,
            x, y + width, z,
            x, y + width, z + height,
            x, y, z,
            x, y, z + height,

            //right
            x + length, y, z,
            x + length, y + width, z,
            x + length, y + width, z + height,
            x + length, y + width, z + height,
            x + length, y, z + height,
            x + length, y, z,

            //up
            x, y, z,
            x + length, y, z,
            x + length, y, z + height,
            x + length, y, z + height,
            x, y, z + height,
            x, y, z,

            //down
            x, y + width, z,
            x + length, y + width, z + height,
            x + length, y + width, z,
            x + length, y + width, z + height,
            x, y + width, z,
            x, y + width, z + height,
        ];

        let black: Array<number>= [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ];
        let grey: Array<number> = [
            105,105,105,
            105,105,105,
            105,105,105,
            105,105,105,
            105,105,105,
            105,105,105,
        ];
        let green: Array<number> = [
            0,128,0,
            0,128,0,
            0,128,0,
            0,128,0,
            0,128,0,
            0,128,0,
        ];
        let yellow : Array<number> = [
            255,255,0,
            255,255,0,
            255,255,0,
            255,255,0,
            255,255,0,
            255,255,0,
        ];
        let red : Array<number> = [
            255,0,0,
            255,0,0,
            255,0,0,
            255,0,0,
            255,0,0,
            255,0,0,
        ];
        let purple: Array<number> = [
            255,0,255,
            255,0,255,
            255,0,255,
            255,0,255,
            255,0,255,
            255,0,255,
        ];


        this.color = black.concat(grey, green, yellow, red, purple);

    }
}