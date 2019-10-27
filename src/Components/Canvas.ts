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
        time *= 0.05;
        let gl = this.gl;


        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        //
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Turn on culling. By default backfacing triangles
        // will be culled.
        gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST);

        this.drawObjects.forEach(object => {
            let program = object.programInfo;

            let attr = object.positionAttr;
            let colorAtt = object.colorAttr;

            let posBuffer = object.bufferInfo;
            let colorBuffer = object.colorInfo;

            let uniform = object.uniformInfo;
            let trans = object.translation;

            let counts = object.numCount;





            gl.useProgram(program);




            gl.enableVertexAttribArray(attr);
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.vertexAttribPointer(
                attr, 3, gl.FLOAT, false, 0, 0
            );


            gl.enableVertexAttribArray(colorAtt);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.vertexAttribPointer(
                colorAtt, 3, gl.UNSIGNED_BYTE, true, 0, 0
            );

            let matrix = this.doMatrix(uniform, gl, trans, [time, time,45], [1, 1, 1]);
            gl.uniformMatrix4fv(this.gl.getUniformLocation(program, 'u_matrix'), false, matrix);

            gl.drawArrays(gl.TRIANGLES, 0, counts);

        })
    }


    setupDrawObjects(gl: WebGLRenderingContext){
        let success = true;

        let allTranslation = [
            [200, 300, 0],
            [400, 300, 0],
            [600, 300, 0],
        ];


        this.loadedObjects.objects.forEach( (item, index) => {
            let program = this.setupProgram(gl);

            if (program === undefined)return;

            let posAtt = this.setupAttr(gl, program);
            let colorAtt = this.setupColor(gl, program);

            let buffer = this.setupBuffer(gl, new Float32Array(item.points));
            let colorBuffer = this.setupBuffer(gl, new Uint8Array(item.color));

            let translation = allTranslation[index];
            let uniform = this.setupUniform();

            let count = item.points.length/3;

            if (buffer !== null && colorBuffer !== null){
                this.drawObjects.push(new ObjectTemplate(program, posAtt, colorAtt, buffer, colorBuffer, uniform, translation, count));
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

    setupColor(gl: WebGLRenderingContext, p: WebGLProgram){
        return gl.getAttribLocation(p, 'a_color');
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

