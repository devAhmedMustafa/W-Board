export class MathPhy{

    static lerp(position, targetPosition, amount=0.2) {

        const lerped = {x: position.x, y: position.y};

        lerped.x += (targetPosition.x - position.x)*amount;
        lerped.y += (targetPosition.y - position.y)*amount;

        return lerped;
    }
}
