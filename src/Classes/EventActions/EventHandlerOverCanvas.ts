import {Coordinate} from "../Geometry/Coordinate";
import MouseClick from "./MouseClick";
import MouseMove from "./MouseMove";

export default class EventHandlerOverCanvas implements MouseMove, MouseClick{

    public mouseMovingPos: Coordinate | null = null;
    public mouseClickingPos: Coordinate | null = null;


    mouseMove(x: number, y: number){

        if (this.mouseMovingPos === null) {
            this.mouseMovingPos = new Coordinate();
        }

        if (this.mouseMovingPos !== null){
            this.mouseMovingPos.x = x;
            this.mouseMovingPos.y = y;
        } else {
            throw new Error(
                'Type error. Mouse pos can not be null'
            )
        }

    }

    mouseClick(x: number, y: number){

        if (this.mouseClickingPos === null) {
            this.mouseClickingPos = new Coordinate();
        }

        if (this.mouseClickingPos !== null){
            this.mouseClickingPos.x = x;
            this.mouseClickingPos.y = y;
        } else {
            throw new Error(
                'Type error. Mouse pos can not be null'
            )
        }

    }


}