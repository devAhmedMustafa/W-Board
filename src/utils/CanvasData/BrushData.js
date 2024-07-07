export default class BrushData{

    static type="HANDWRITE"

    constructor({thick, color, xo, yo}){

        this.type = BrushData.type;

        this.thick = thick;
        this.color = color;
        this.xo = xo;
        this.yo = yo;

        this.x = [];
        this.y = [];

        this.max;
        this.min;
    }

    addVertex(x, y){
        this.x.push(x);
        this.y.push(y);
    }

    getMinVertices(){
        this.min = {x: Math.min(...this.x), y: Math.min(...this.y)};
    }

    getMaxVertices(){
        this.max = {x: Math.max(...this.x), y: Math.max(...this.y)};
    }

    // draw(ctx){

    //     ctx.beginPath();
    //     ctx.moveTo(this.xo, this.yo);

        
    //     for (let i = 0; i < this.x.length; i++){
    //         ctx.lineTo(this.x[i], this.y[i]);
    //     }
    //     ctx.stroke();
    // }
}