export default class ObjectTemplate {

    programInfo : WebGLProgram;
    attributes: number;
    bufferInfo: WebGLBuffer;
    uniformInfo: WebGLUniformLocation;

    constructor(p: WebGLProgram, a: number, b: WebGLBuffer, u: WebGLUniformLocation) {

        this.programInfo  = p;
        this.attributes  = a;
        this.bufferInfo = b;
        this.uniformInfo = u;

    }

}