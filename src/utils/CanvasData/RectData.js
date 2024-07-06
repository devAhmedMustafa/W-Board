export default class RectData{

    static type = "RECTANGULAR";

    constructor({position, size, color, strokeColor=undefined, strokeThickness = 0, radii=[0]}){

        this.type = RectData.type;

        this.position = position;
        this.size = size;
        this.color = color;
        this.strokeColor = strokeColor? strokeColor : color;
        this.strokeThickness = strokeThickness
        this.radii = radii;
    }
}