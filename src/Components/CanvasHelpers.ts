import Rectangle from "../Classes/Geometry/Rectangle";
import Matrix from "../Classes/Matrix/Matrix";

export default class CanvasHelpers {

    m4: Matrix = new Matrix();



    doMatrix(matrix: any, gl: any, translation: Array<number>, rotation: Array<number>, scale: Array<number>){
        matrix = this.m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
        matrix = this.m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = this.m4.xRotate(matrix, rotation[0] * Math.PI / 180);
        matrix = this.m4.yRotate(matrix, rotation[1] * Math.PI / 180);
        matrix = this.m4.zRotate(matrix, rotation[2] * Math.PI / 180);
        matrix = this.m4.scale(matrix, scale[0], scale[1], scale[2]);

        return matrix;
    }

    createShader(gl: any, type: any, source: string){
        let shader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success){
            return shader;
        }

        gl.deleteShader(shader);
    }


    getRandomRect(){
        let aSide = Math.floor(Math.random() * 50) + 20;
        let bSide = Math.floor(Math.random() * 50) + 20;

        let rect = Rectangle.createBySides(aSide, bSide);
        let arrays = rect.rectArray();
        let newArr = arrays.map(function (items) {
            return items += 200;
        });

        return newArr;
    }



    setPoints(gl: any, points: Float32Array | Uint8Array){
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    }



    // rangeControl(x: number, y: number, z: number,
    //                 xAngle: number, yAngle: number,zAngle: number,
    //                 scaleX: number, scaleY: number, scaleZ: number){
    //
    //     this.obProps.translation = [x, y, z];
    //     this.obProps.scale = [scaleX, scaleY, scaleZ];
    //
    //     this.obProps.xRotation = xAngle;
    //     this.obProps.yRotation = yAngle;
    //     this.obProps.zRotation = zAngle;
    //
    //
    // }
}