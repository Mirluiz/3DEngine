import React, {useEffect, useRef, useState} from "react";

//custom
import _thisStyle from "./PCanvas.module.css";
import EventHandlerOverCanvas from "../../Classes/EventActions/EventHandlerOverCanvas";
import Canvas from "../../Components/Canvas";



export default function PCanvas() {
    const inputElXRange = useRef(null);
    const inputElYRange = useRef(null);
    const inputElZRange = useRef(null);

    const inputElXAngle = useRef(null);
    const inputElYAngle = useRef(null);
    const inputElZAngle = useRef(null);

    const inputElScaleX = useRef(null);
    const inputElScaleY = useRef(null);
    const inputElScaleZ = useRef(null);
    const [cnElement, onCanvas] : Canvas | any = useState(null);
    const canvasElem = useRef(null);
    const width = 1200;
    const height = 900;

    const mouseMoveControl = new EventHandlerOverCanvas();

    let connect : any = null;

    useEffect(() => {
        connect = new Canvas(canvasElem);
        onCanvas(connect);
        connect.run();
    }, []);

    function rangeControlPCanvas () : void {

        let xRange : any = inputElXRange.current;
        let yRange : any = inputElYRange.current;
        let zRange : any = inputElZRange.current;

        let xAngl : any = inputElXAngle.current;
        let yAngl : any = inputElYAngle.current;
        let zAngl : any = inputElZAngle.current;

        let xScale : any = inputElScaleX.current;
        let yScale : any = inputElScaleY.current;
        let zScale : any = inputElScaleZ.current;
        if (inputElXRange !== null) {
            cnElement.rangeControl( xRange.value, yRange.value, zRange.value,
                                        xAngl.value, yAngl.value, zAngl.value,
                                        xScale.value, yScale.value, zScale.value,
                                    
                                    );
        }
    };


    return(
            <div className={_thisStyle.container}>
                <div className={_thisStyle.rangeInp}>
                    <div>
                        X :<input  type="range"
                                    ref={inputElXRange}
                                    name="xRange"
                                    min="0" max={width} step="1"
                                    // value={rangeValX}
                                    onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Y :<input type="range"
                                  ref={inputElYRange}
                                  min="0" max={width} step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Z :<input type="range"
                                  ref={inputElZRange}
                                  min="0" max={width} step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Angle X:<input type="range"
                                  ref={inputElXAngle}
                                  min="0" max="360" step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Angle Y:<input type="range"
                                  ref={inputElYAngle}
                                  min="0" max="360" step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Angle Z:<input type="range"
                                  ref={inputElZAngle}
                                  min="0" max="360" step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Scale X :<input type="range"
                                  ref={inputElScaleX}
                                  min="0" max="10" step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Scale Y :<input type="range"
                                  ref={inputElScaleY}
                                  min="0" max="10" step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                    <div>
                        Scale Z :<input type="range"
                                  ref={inputElScaleZ}
                                  min="0" max="10" step="1"
                                  onChange={() => rangeControlPCanvas()}/>
                    </div>
                </div>
                <canvas className={_thisStyle.canvas}
                        width={width}
                        height={height}
                        ref={canvasElem}
                        onClick={(e) => mouseMoveControl.mouseClick(10, 20)} onMouseMove={(e) => mouseMoveControl.mouseMove(10, 20)}>

                </canvas>

            </div>
    )
}