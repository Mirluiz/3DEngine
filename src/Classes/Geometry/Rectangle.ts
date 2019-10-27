import {Coordinate} from "./Coordinate";

export default class Rectangle {

    x1: number;
    y1: number;

    x2: number;
    y2: number;


    begin: Coordinate;
    end: Coordinate;

    constructor(){
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;


        this.begin = new Coordinate();
        this.end = new Coordinate();
    }



    getRectWidth(){
        return Math.abs(this.x2 - this.x1);
    }

    getRectHeight(){
        return Math.abs(this.y1 - this.y2);
    }



    rectArray(){
        let ret = [];

        let w = this.getRectWidth();
        let h = this.getRectHeight();

        ret[0] = this.x1;
        ret[1] = this.y1;
        ret[2] = this.x1 + w;
        ret[3] = this.y1;
        ret[4] = this.x1;
        ret[5] = this.y1 + h;

        ret[6] = this.x1;
        ret[7] = this.y1 + h;
        ret[8] = this.x1 + w;
        ret[9] = this.y1 + h;
        ret[10] = this.x1 + w;
        ret[11] = this.y1;



        return ret;
    }



























    //statics


    static createBySides(a_side: number, b_side: number) {
        let newRect = new this();

        newRect.begin = Coordinate.create(0, 0);
        newRect.end = Coordinate.create(a_side, b_side);

        newRect.x1 = newRect.begin.x;
        newRect.y1 = newRect.begin.y;

        newRect.x2 = newRect.end.x;
        newRect.y2 = newRect.end.y;

        return newRect;
    }


    static create(_begin: Coordinate, _end: Coordinate) {
        let newRect = new this();

        newRect.begin = _begin;
        newRect.end = _end;

        newRect.x1 = _begin.x;
        newRect.y1 = _begin.y;

        newRect.x2 = _end.x;
        newRect.y2 = _end.y;

        return newRect;
    }

}