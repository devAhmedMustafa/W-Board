import { useRef, useState, useEffect } from "react";
import Line from "../../utils/drawObjects/Line";

export default function LineLayer({start, end}){

    const canvRef = useRef();

    const [thickness, setThickness] = useState(2);
    const [color, setColor] = useState("#000000");

    useEffect(()=>{
        drawLine();
    }, [])

    function drawLine(){

        const canvas = canvRef.current;

        let width = Math.abs(start.x - end.x);
        let height = Math.abs(start.y - end.y);
        
        canvas.style.top = `${start.y-height}px`;
        canvas.style.left = `${start.x-width}px`;
        canvas.width = width*2;
        canvas.height = height*2;
        canvas.style.zIndex = 10;

        const ctx = canvas.getContext('2d');

        const lineDim = {xo: canvas.width/2, yo: canvas.height/2, x: end.x - start.x + width, y: end.y - start.y + height};
        
        const line = new Line({...lineDim, thick: thickness, color: color});

        line.draw(ctx);

    }

    return (
        <canvas ref={canvRef} className="absolute z-20">

        </canvas>
    )
}