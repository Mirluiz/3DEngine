import {Coordinate} from "../Geometry/Coordinate";

export default interface MouseMove {

    mouseMovingPos: Coordinate | null;
    mouseMove(x:number, y:number): void;
}