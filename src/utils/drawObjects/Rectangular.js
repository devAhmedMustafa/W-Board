export default class Rectangular{
    constructor({x, y, width, height, color, strokeColor=undefined, radii=[0]}){

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.strokeColor = strokeColor? strokeColor : color;

        this.radii = radii;
    }
    
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
        ctx.fill();
        ctx.stroke();

    }
}