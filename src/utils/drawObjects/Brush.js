export default class Brush{
    constructor(thick, color){
        this.thick = thick;
        this.color = color;
    }
    start(ctx, xo, yo){
        ctx.beginPath();
        ctx.lineWidth = this.thick;
        ctx.strokeStyle = this.color;
        ctx.moveTo(xo, yo);
    }
    draw(ctx, x, y){
        
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}