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
    }

    addVertex(x, y){
        this.x.push(x);
        this.y.push(y);
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