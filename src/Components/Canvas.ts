import GLSL from "../Constants/GLSL";
import CanvasHelpers from "./CanvasHelpers";
import ObjectTemplate from "../Classes/Objects/ObjectTemplate";
import LoadedObject from "../UserData/LoadedObject";

interface CanvasInfo{
    height: number,
    width: number
}

export default class Canvas extends CanvasHelpers {

    canvasHTML: any;
    canvasInfo: CanvasInfo = new class implements CanvasInfo {
        height: number = 0;
        width: number = 0;
    };


    vertexShadersText: string = "";
    fragShadersText: string = "";


    gl: WebGLRenderingContext;
    vertexShader: any = null;
    fragShader: any = null;

    loadedObjects: LoadedObject = new LoadedObject();
    drawObjects: Array<ObjectTemplate> = [];



    constructor(canvasHtml: any){
        super();
        this.canvasHTML = canvasHtml.current;
        this.canvasInfo.height = this.canvasHTML.height;
        this.canvasInfo.width = this.canvasHTML.width;

        this.gl = this.canvasHTML.getContext("webgl");
    }





    drawScene(time: number){
        let gl = this.gl;

        this.drawObjects.forEach(object => {
            let program = object.programInfo;
            let attr = object.attributes;
            let bufferInfo = object.bufferInfo;
            let uniform = object.uniformInfo;

            gl.useProgram(program);

            gl.vertexAttribPointer(
                attr, 3, gl.FLOAT, false, 0, 0
            );

            gl.enableVertexAttribArray(attr);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo);

            let matrix = this.doMatrix(uniform, gl, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
            gl.uniformMatrix4fv(this.gl.getUniformLocation(program, 'u_matrix'), false, matrix);

            gl.drawArrays(gl.TRIANGLES, 0, 18);

        })
    }


    setupDrawObjects(gl: WebGLRenderingContext){
        let success = true;
        this.loadedObjects.objects.forEach( (item) => {
            let program = this.setupProgram(gl);

            if (program === undefined)return;

            let attributes = this.setupAttr(gl, program);
            let buffer = this.setupBuffer(gl, new Float32Array(item.points));
            // console.log(item.points);
            let uniform = this.setupUniform();

            if (buffer !== null){
                this.drawObjects.push(new ObjectTemplate(program, attributes, buffer, uniform));
            } else {
                success = false;
                console.error("Setup problems");
            }
        });

        return success;
    }

    setupBuffer(gl: WebGLRenderingContext, points: Float32Array | Uint8Array){

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

        return buffer;
    }

    setupUniform(){
        return this.m4.identity();
    }

    setupAttr(gl: WebGLRenderingContext, p: WebGLProgram){
        return gl.getAttribLocation(p, 'a_position');
    }

    setupProgram(gl: WebGLRenderingContext){
        let program = gl.createProgram();

        if (program === null){
            console.error("program is null");
            return ;
        }

        gl.attachShader(program, this.vertexShader);
        gl.attachShader(program, this.fragShader);
        gl.linkProgram(program);

        let isSuccess = gl.getProgramParameter(program, gl.LINK_STATUS);

        if(isSuccess){
            return program;
        }

        gl.deleteProgram(program);

        return false;
    }









    setupGl(){
        if(this.gl === null) {
            return false;
        }

        this.vertexShader = this.createShader(this.gl, this.gl.VERTEX_SHADER, this.vertexShadersText);
        this.fragShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragShadersText);


        return true;
    }


    run(){

        this.fragShadersText = GLSL.getFrag();
        this.vertexShadersText = GLSL.getVert();
        
        if(this.setupGl()){

            if (this.gl === null){
                return;
            }

            if(this.setupDrawObjects(this.gl)){
                this.animate();
            }
            
        }

    }


    animate() {

        const startTime = performance.now();
        const animate = () => {
            requestAnimationFrame(animate);
            this.clearAll();
            this.drawScene(performance.now() - startTime);
        };

        window.requestAnimationFrame(animate);
    }




    clearAll(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }


}

