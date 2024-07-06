export default class Brush{
    constructor({thick, color, xo, yo}){
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

    start(ctx, xo, yo){
        ctx.beginPath();
        ctx.lineWidth = this.thick;
        ctx.strokeStyle = this.color;
        ctx.moveTo(xo, yo);
    }
    draw(ctx){
        
        for (let i = 0; i < this.x.length; i++){
            ctx.lineTo(this.x[i], this.y[i]);
        }
        ctx.stroke();
    }
}