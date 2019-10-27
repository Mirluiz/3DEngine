export default class ObjectTemplate {

    programInfo : WebGLProgram;
    positionAttr: number;
    colorAttr: number;
    bufferInfo: WebGLBuffer;
    colorInfo: WebGLBuffer;
    uniformInfo: WebGLUniformLocation;
    translation: Array<number>;
    numCount: number;

    constructor(p: WebGLProgram, a: number, c: number,  b: WebGLBuffer, cB: WebGLBuffer, u: WebGLUniformLocation, t: Array<number>, nC: number) {

        this.programInfo  = p;

        this.positionAttr  = a;
        this.colorAttr  = c;

        this.bufferInfo = b;
        this.colorInfo  = cB;

        this.uniformInfo = u;

        this.translation = t;

        this.numCount = nC;

    }

}