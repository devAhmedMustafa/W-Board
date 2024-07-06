export default class Rectangular{


    constructor({x, y, width, height, color, strokeColor=undefined, strokeThickness = 0, radii=[0]}){

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.strokeColor = strokeColor? strokeColor : color;
        this.strokeThickness = strokeThickness

        this.radii = radii;
    }
    
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeThickness;
        ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
        ctx.fill();
        ctx.stroke()

    }
}