export default class GLSL {
    //vertex shaders
    static vertCode: string = `// an attribute will receive data from a buffer
                                    attribute vec4 a_position;
                                    attribute vec4 a_color;
                                
                                    uniform mat4 u_matrix;
                                    varying vec4 v_color;
                                    
                                    void main() {
                                      // Умножаем координату на матрицу
                                      gl_Position = u_matrix * a_position;
                                      v_color = a_color;
                                    }`;

    //fragment shaders
    static fragCode: string =  `
                                precision mediump float;
                                
                                // Passed in from the vertex shader.
                                varying vec4 v_color;
                                
                                void main() {
                                   gl_FragColor = v_color;
                                }
                                  `;


    static testVertCode: string = `
    attribute vec4 a_position;

    // all shaders have a main function
    void main() {
  
      // gl_Position is a special variable a vertex shader
      // is responsible for setting
      gl_Position = a_position;
    }       
    `
    static testFragCode: string = `
    precision mediump float;

    void main() {
      // gl_FragColor is a special variable a fragment shader
      // is responsible for setting
      gl_FragColor = vec4(1, 0, 0.5, 1);
    }          
    `



    public static getFrag(){
        return  this.fragCode;
    }

    public static getVert(){
        return this.vertCode;
    }



}