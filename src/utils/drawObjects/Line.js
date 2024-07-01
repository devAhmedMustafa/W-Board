export default class Line{
    constructor({xo, yo, x, y, thick, color}){
        this.xo = xo;
        this.yo = yo;
        this.x = x;
        this.y = y;
        this.thick = thick;
        this.color = color;
    }
    draw(ctx){
        ctx.lineWidth = this.thick;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.xo, this.yo);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
    update(ctx, x, y){
        this.x = x;
        this.y = y;
        this.draw(ctx);
    }
}