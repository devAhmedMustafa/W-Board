export default class Brush{
    constructor({thick, color, shift = {x: 0, y: 0}}){
        this.thick = thick;
        this.color = color;
        this.xo;
        this.yo;

        this.x = [];
        this.y = [];
        this.shift = shift;
    }

    addVertex(x, y){
        this.x.push(x);
        this.y.push(y);
    }

    start(ctx, xo, yo){

        this.xo = xo - this.shift.x;
        this.yo = yo - this.shift.y;

        ctx.beginPath();
        ctx.lineWidth = this.thick;
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.xo, this.yo);
    }
    drawOnce(ctx){
        
        for (let i = 0; i < this.x.length; i++){
            ctx.lineTo(this.x[i]-this.shift.x, this.y[i]-this.shift.y);
        }
        ctx.stroke();
    }
    realTimeDraw(ctx, x, y){
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}