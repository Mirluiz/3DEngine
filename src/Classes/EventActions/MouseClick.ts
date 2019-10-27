import {Coordinate} from "../Geometry/Coordinate";

export default interface MouseMove {

    mouseClickingPos: Coordinate | null;
    mouseClick(x: number, y: number): void;

}