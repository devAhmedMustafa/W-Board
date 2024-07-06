export default class LineData{

    static type = "LINE";

    constructor({position, xo, yo, x, y, thick=1, color="#000"}){

        this.type = LineData.type;

        this.position = position?position:{x: Math.min(xo, x), y: Math.min(yo, y)}
        this.xo = xo;
        this.yo = yo;
        this.x = x;
        this.y = y;
        this.thick = thick;
        this.color = color;
    }
}